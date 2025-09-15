"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Chip,
  Image,
  Divider,
  Spinner,
  Button,
  Link,
} from "@heroui/react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchRoom } from "@/features/room/room-thunk";
import { formatPHP } from "@/lib/format-php";
import { Carousel, CarouselItem } from "@/components/ui/carousel";

export default function RoomDetails() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { room, isLoading } = useSelector((state: RootState) => state.room);

  useEffect(() => {
    if (id) {
      dispatch(fetchRoom(id as string));
    }
  }, [dispatch, id]);

  if (isLoading || !room) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" label="Loading room details..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <Card className="border-none shadow-none">
        <CardBody className="space-y-6">
          <div className="flex">
            <div className="flex-1">
              <Carousel
                autoScroll
                autoScrollInterval={3000}
                itemsPerView={1}
                dotType="image"
                images={room.images}
              >
                {room.images?.map((src, index) => (
                  <CarouselItem key={index}>
                    <Image
                      alt={`room image ${index + 1}`}
                      src={src}
                      radius="lg"
                      width="100%"
                      className="object-cover w-full h-[500px] md:h-[400px]"
                    />
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
            <div className="flex-1 space-y-4 px-2">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-xl font-bold capitalize">
                    {room.room_type}{" "}
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {" "}
                      24 x 24 cm{" "}
                    </span>
                  </h1>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {room.description}
                  </span>
                </div>
                <span>{formatPHP(Number(room.base_price))}/night</span>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <h2>Beds</h2>
                  <div className="flex gap-2">
                    {room.beds?.map((bed) => (
                      <Chip className="capitalize">{bed}</Chip>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <h2>Room facilities and Services</h2>
                  <div className="flex gap-2">
                    {room.facilities?.map((fac) => <Chip>{fac}</Chip>)}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  color="primary"
                  as={Link}
                  href={`/guest/rooms/reservation/${room.id}`}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
