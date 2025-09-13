"use client";
import React from "react";
import { Room } from "@/types/room";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Spinner,
} from "@heroui/react";
import { ArrowUpRight, Bed, Tv, UserCircle, Wifi } from "lucide-react";
import { formatPHP } from "@/lib/format-php";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import SkeletonLoader from "../skeleton-loader";

interface RoomProps {
  rooms: Room[];
  isLoading: boolean;
}
export const RoomsCarousel: React.FC<RoomProps> = ({ rooms, isLoading }) => {
  function shuffle<T>(array: T[]): T[] {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const randomRooms = shuffle(rooms).slice(0, 6);

  return (
    <div>
      {!isLoading ? (
        <section className="space-y-4 py-8 border-b border-gray-300">
          <div className="space-y-4 text-center">
            <h3>Rooms & Suites</h3>
            <h1 className="text-2xl">Our Exquisite Rooms Collection</h1>
          </div>
          <Carousel
            autoScroll
            autoScrollInterval={2500}
            itemsPerView={1}
            dotType="image"
            responsive={{ sm: 1, md: 2, lg: 3, xl: 3 }}
          >
            {randomRooms.map((room) => (
              <CarouselItem key={room.id}>
                {/* <Card
                    isHoverable
                    
                    className="w-full sm:w-72 md:w-80 lg:w-96 h-full flex flex-col"
                    >
                    <CardBody className="flex flex-col h-full">
                        <Image
                        src="/bg.jpg"
                        alt={room.room_type}
                        className="rounded-lg w-full h-48 object-cover"
                        />
                        <div className="mt-4 flex flex-col flex-1 justify-between gap-4">
                        <div>
                            <div className="flex justify-between items-center gap-4">
                            <p className="font-semibold capitalize">
                                {room.room_type}
                            </p>
                            {formatPHP(Number(room.base_price))}
                            </div>
                            <p className="font-light text-gray-500">
                            {room.description}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">
                            Room Features
                            </h3>
                            <div className="flex gap-4 text-gray-700 flex-wrap">
                            <div className="flex items-center gap-2">
                                <UserCircle size={20} /> 2 Guests
                            </div>
                            <div className="flex items-center gap-2">
                                <Bed size={20} /> 1 Queen Bed
                            </div>
                            <div className="flex items-center gap-2">
                                <Wifi size={20} /> Free WiFi
                            </div>
                            <div className="flex items-center gap-2">
                                <Tv size={20} /> Smart TV
                            </div>
                            </div>
                        </div>
                        </div>
                    </CardBody>
                    </Card> */}
                <Card
                  isFooterBlurred
                  className="w-full h-[300px] col-span-12 sm:col-span-7 dark:bg-gray-900"
                >
                  <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      Comfort & Relaxation
                    </p>
                    <h4 className="text-white/90 font-medium text-xl">
                      Discover your perfect stay with us
                    </h4>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Relaxing app background"
                    className="z-0 w-full h-full object-cover"
                    src={room.images?.[0] || "/bg.jpg"}
                  />
                  <CardFooter className="absolute flex gap-2 bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex grow gap-2 items-center">
                      <Image
                        alt="Breathing app icon"
                        className="rounded-full w-10 h-10 bg-black"
                        src={
                          room.images?.[
                            Math.floor(Math.random() * room.images?.length)
                          ] || "/bg.jpg"
                        }
                      />
                      <div className="flex flex-col">
                        <p className="text-tiny text-white/60 capitalize">
                          {room.room_type}
                        </p>
                        <p className="text-tiny text-white/60">
                          {room.description}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 bg-white dark:bg-gray-800 dark:text-white">
                      {formatPHP(Number(room.base_price))}
                    </span>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </Carousel>
        </section>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto py-12">
          {[1, 2, 3].map((index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      )}
    </div>
  );
};
