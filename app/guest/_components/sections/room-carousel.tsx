"use client";
import React from "react";
import { RoomType } from "@/types/room";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@heroui/react";
import { formatPHP } from "@/lib/format-php";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import SkeletonLoader from "../skeleton-loader";

interface RoomProps {
  rooms: RoomType[];
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
        <section className="space-y-8 py-16 bg-gray-50">
          {/* Header */}
          <div className="text-center space-y-2">
            <h3 className="text-primary font-semibold tracking-wide uppercase">
              Rooms & Suites
            </h3>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Explore Our Exquisite Room Collection
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enjoy comfort, luxury, and modern amenities crafted for your
              perfect stay.
            </p>
          </div>

          {/* Carousel */}
          <Carousel
            autoScroll
            autoScrollInterval={2500}
            itemsPerView={1}
            dotType="image"
            responsive={{ sm: 1, md: 2, lg: 3, xl: 3 }}
            className="max-w-7xl mx-auto"
          >
            {randomRooms.map((room) => (
              <CarouselItem key={room.id}>
                <Card
                  isFooterBlurred
                  as={Link}
                  href={`/guest/rooms/reservation/${room.id}`}
                  className="w-full h-[320px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-gray-900/40"
                >
                  {/* Header Overlay */}
                  <CardHeader className="absolute z-10 top-3 left-3 flex-col items-start bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md">
                    <span className="uppercase text-xs text-white/70 font-semibold">
                      Comfort & Luxury
                    </span>
                    <h4 className="text-white font-semibold text-lg leading-tight">
                      {room.name}
                    </h4>
                    <span className="mt-1 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                      {formatPHP(Number(room.price))}/night
                    </span>
                  </CardHeader>

                  {/* Room Image */}
                  <Image
                    removeWrapper
                    alt={room.name}
                    className="z-0 w-full h-full object-cover"
                    src={room.image || "/bg.jpg"}
                  />

                  {/* Footer Overlay */}
                  <CardFooter className="absolute bottom-0 w-full bg-black/30 backdrop-blur-md border-t border-white/10 px-4 py-3">
                    <div className="flex flex-col">
                      <p className="text-sm text-white/80 line-clamp-1">
                        {room.description}
                      </p>
                    </div>
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
