import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { formatPHP } from "@/lib/format-php";
import { FetchRoomsParams, Room } from "@/types/room";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Tab,
  Tabs,
  Spinner,
  Input,
  Button,
} from "@heroui/react";
import React from "react";

interface RoomProps {
  rooms: Room[];
  isLoading: boolean;
  query: FetchRoomsParams;
  setQuery: React.Dispatch<React.SetStateAction<FetchRoomsParams>>;
  fetchQuery: any;
}

export const RoomsList: React.FC<RoomProps> = ({
  rooms,
  isLoading,
  query,
  setQuery,
  fetchQuery,
}) => {
  const roomTypes = [
    { key: "all", name: "All" },
    { key: "delux", name: "Delux" },
    { key: "standard", name: "Standard" },
    { key: "executive", name: "Executive" },
    { key: "junior room", name: "Junior Room" },
    { key: "vip suites", name: "VIP Suites" },
    { key: "two bedrooms executive", name: "Two Bedrooms Executive" },
    { key: "family room(6)", name: "Family Room(6)" },
    { key: "family room(7)", name: "Family Room(7)" },
  ];

  return (
    <div className="md:p-4 bg-white dark:bg-gray-800">
      <div>
        <span className="text-sm text-gray-700 dark:text-gray-200">
          Price Range
        </span>
        <div className="flex items-center gap-2 max-w-96">
          <Input
            placeholder="min price"
            variant="bordered"
            type="number"
            size="sm"
            value={query.minPrice?.toString() ?? ""}
            onChange={(e) =>
              setQuery({
                ...query,
                minPrice: Number(e.target.value),
              })
            }
          />
          {" - "}
          <Input
            placeholder="max price"
            variant="bordered"
            type="number"
            size="sm"
            value={query.maxPrice?.toString() ?? ""}
            onChange={(e) =>
              setQuery({
                ...query,
                maxPrice:
                  Number(e.target.value) > 0
                    ? Number(e.target.value)
                    : Number(""),
              })
            }
          />
          <Button size="sm" color="primary" onPress={fetchQuery}>
            Search
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto mb-4">
        <Tabs
          onSelectionChange={(key: React.Key) =>
            setQuery({
              ...query,
              roomType: key !== "all" ? (key as string) : "",
            })
          }
          aria-label="Room Types"
          color="primary"
          variant="underlined"
        >
          {roomTypes.map((type) => (
            <Tab
              key={type.key}
              title={<span className="whitespace-nowrap">{type.name}</span>}
            />
          ))}
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" label="Loading rooms..." />
        </div>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2 md:p-4">
          {rooms.map((room) => (
            <Card
              isPressable
              shadow="sm"
              radius="md"
              key={room.id}
              as={Link}
              href={`/guest/room/${room.id}`}
              className="hover:shadow-md transition-shadow"
            >
              <CardBody className="overflow-hidden p-0 dark:bg-gray-900">
                {(room?.images?.length ?? 0) > 1 ? (
                  <Carousel autoScroll itemsPerView={1} dotType="image">
                    {room.images?.map((img, index) => (
                      <CarouselItem key={index}>
                        <Image
                          alt="room image"
                          className="w-full object-cover h-[140px]"
                          radius="sm"
                          src={img}
                          width="100%"
                        />
                      </CarouselItem>
                    ))}
                  </Carousel>
                ) : (
                  <Image
                    alt="room image"
                    className="w-full object-cover h-[140px]"
                    radius="sm"
                    src={room.images?.[0] || "/bg.jpg"}
                    width="100%"
                  />
                )}
              </CardBody>

              <CardFooter className="text-sm text-left dark:bg-gray-900 p-3">
                <div className="flex flex-col gap-1">
                  <b className="capitalize text-base">{room.room_type}</b>
                  <span className="text-gray-500 line-clamp-2">
                    {room.description}
                  </span>
                  <p className="font-semibold text-primary">
                    {formatPHP(Number(room.base_price))} / night
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <span className="text-gray-600 dark:text-gray-300">
            No rooms found.
          </span>
        </div>
      )}
    </div>
  );
};
