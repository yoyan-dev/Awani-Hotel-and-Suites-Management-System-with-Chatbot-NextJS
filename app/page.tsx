'use client'
import { addToast, Button } from "@heroui/react";
export default function Home() {
  return (
    <div>
      <Button
          key='primary'
          color='primary'
          variant={"flat"}
          onPress={() =>
            addToast({
              title: "Toast title",
              description: "Toast displayed successfully",
              color: "primary",
            })
          }
        >
          text
        </Button>
    </div>
  );
}
