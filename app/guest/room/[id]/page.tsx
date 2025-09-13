"use client";
import React, { useEffect } from "react";
import { Card, CardBody, Chip, Image, Divider, Spinner } from "@heroui/react";
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
    <div className="p-6 space-y-6">
      {/* Top Section */}
      <Card className="border-none shadow-md">
        <CardBody className="space-y-6">
          {/* Carousel */}
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
                  className="object-cover w-full h-[300px] md:h-[400px]"
                />
              </CarouselItem>
            ))}
          </Carousel>

          {/* Title & Price */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold">{room.name}</h1>
            <p className="text-xl font-semibold text-primary">
              {formatPHP(Number(room.base_price))} / night
            </p>
          </div>

          <Divider />

          {/* Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Basic Information</h2>
              <p>
                <span className="font-medium">Type:</span> {room.room_type}
              </p>
              <p>
                <span className="font-medium">Area:</span> {room.area} sqm
              </p>
              <p>
                <span className="font-medium">Max Guests:</span>{" "}
                {room.max_guest}
              </p>
              <p className="text-gray-500 leading-relaxed">
                {room.description}
              </p>
            </div>

            {/* Room Photos */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Photos</h2>
              <div className="flex flex-wrap gap-3">
                {room.images?.map((url: string, i: number) => (
                  <Image
                    key={i}
                    src={url}
                    alt={`Room photo ${i}`}
                    width={120}
                    height={80}
                    radius="md"
                    className="object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Beds */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Beds</h2>
              <div className="flex flex-wrap gap-2">
                {room.beds?.map((bed: string, i: number) => (
                  <Chip key={i} variant="flat" color="primary">
                    {bed}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Facilities & Services
              </h2>
              <div className="flex flex-wrap gap-2">
                {room.facilities?.map((fac: string, i: number) => (
                  <Chip key={i} variant="flat" color="secondary">
                    {fac}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
