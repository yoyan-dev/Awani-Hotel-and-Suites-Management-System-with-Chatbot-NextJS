create or replace function get_full_analytics()
returns jsonb
language plpgsql
as $$
declare
total_bookings int;
average_stay_length numeric;
status_count jsonb;
daily_bookings jsonb;

total_rooms int;
occupied_rooms int;
available_rooms int;

room_types jsonb;

revenue_total numeric;
monthly_revenue jsonb;
begin
-- BOOKINGS
select count(\*) into total_bookings from bookings;

select avg(nights) into average_stay_length from bookings;

select jsonb_object_agg(status, count)
into status_count
from (
select status, count(\*)
from bookings
group by status
) s;

select jsonb_agg(row_to_json(t))
into daily_bookings
from (
select created_at::date as date, count(\*) as count
from bookings
group by 1
order by date
) t;

-- ROOMS
select count(\*) into total_rooms from rooms;

select count(\*) into occupied_rooms
from rooms where status = 'occupied';

select count(\*) into available_rooms
from rooms where status = 'available';

-- ROOM TYPES
select jsonb_agg(row_to_json(r))
into room_types
from (
select
rt.id,
rt.name,
count(r.id) as total_rooms,
sum(case when r.status = 'occupied' then 1 else 0 end) as occupied,
avg(rt.base_price) as average_price,
(
select sum(total_price)
from bookings b
where b.room_type_id = rt.id
) as revenue,
round(
(sum(case when r.status = 'occupied' then 1 else 0 end)::decimal
/ nullif(count(r.id), 0) \* 100),
2
) as occupancy_rate
from room_types rt
left join rooms r on r.room_type_id = rt.id
group by rt.id
) r;

-- REVENUE
select coalesce(sum(total_price), 0)
into revenue_total
from bookings;

select jsonb_agg(row_to_json(t))
into monthly_revenue
from (
select to_char(created_at, 'YYYY-MM') as month,
sum(total_price) as revenue
from bookings
group by 1
order by month
) t;

-- RETURN FINAL
return jsonb_build_object(
'bookings', jsonb_build_object(
'total_bookings', total_bookings,
'average_stay_length', average_stay_length,
'status_count', status_count,
'daily_bookings', daily_bookings
),
'rooms', jsonb_build_object(
'total_rooms', total_rooms,
'occupied_rooms', occupied_rooms,
'available_rooms', available_rooms
),
'room_types', room_types,
'revenue', jsonb_build_object(
'total', revenue_total,
'monthly', monthly_revenue
)
);
end;

$$
;
$$
