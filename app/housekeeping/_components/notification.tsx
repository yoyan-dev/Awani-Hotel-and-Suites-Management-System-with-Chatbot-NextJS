import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { useHousekeeping } from "@/hooks/use-housekeeping";
import { Alert } from "@heroui/react";
import React from "react";

export default function Notification() {
  const { tasks, isLoading, fetchHousekeepingTasks } = useHousekeeping();

  React.useEffect(() => {
    fetchHousekeepingTasks(null);
  }, []);
  return (
    <div>
      {!isLoading ? (
        <Carousel
          autoScroll
          autoScrollInterval={4000}
          itemsPerView={1}
          dotType="none"
          hasButton={false}
        >
          {tasks.map((task) => (
            <CarouselItem key={task.id}>
              <Alert
                color="success"
                title="Notification"
                description={task.message}
              />
            </CarouselItem>
          ))}
        </Carousel>
      ) : null}
    </div>
  );
}
