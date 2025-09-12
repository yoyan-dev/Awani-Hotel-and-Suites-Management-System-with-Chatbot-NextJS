import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Room } from "@/types/room";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Tab,
  Tabs,
} from "@heroui/react";
import React from "react";

interface RoomProps {
  rooms: Room[];
  isLoading: boolean;
}
export const RoomsList: React.FC<RoomProps> = ({ rooms, isLoading }) => {
  return (
    <div className="p-4">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <span>Photos</span>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <span>Music</span>
            </div>
          }
        />
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <span>Videos</span>
            </div>
          }
        />
      </Tabs>
      <div className="grid grid-cols-4 gap-4 p-4">
        {rooms.map((room) => (
          <Card
            isPressable
            shadow="sm"
            radius="sm"
            as={Link}
            href={`/guest/room/${room.id}`}
          >
            <CardBody className="overflow-visible p-0">
              {(room?.images?.length ?? 0) > 1 ? (
                <Carousel
                  autoScrollInterval={2500}
                  itemsPerView={1}
                  dotType="image"
                >
                  {room.images?.map((img) => (
                    <CarouselItem key={img}>
                      <Image
                        alt="room image"
                        className="w-full object-cover h-[140px]"
                        radius="sm"
                        shadow="sm"
                        src={img}
                        width="100%"
                      />
                    </CarouselItem>
                  ))}
                </Carousel>
              ) : (
                <CarouselItem>
                  <Image
                    alt="room image"
                    className="w-full object-cover h-[140px]"
                    radius="sm"
                    shadow="sm"
                    src={room.images?.[0] || "/bg.jpg"}
                    width="100%"
                  />
                </CarouselItem>
              )}
            </CardBody>
            <CardFooter className="text-small text-left">
              <div className="flex flex-col gap-2">
                <b className="capitalize">{room.room_type}</b>
                <span>{room.description}</span>
                <p>100/night</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
