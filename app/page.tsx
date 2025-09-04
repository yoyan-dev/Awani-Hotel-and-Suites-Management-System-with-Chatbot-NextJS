"use client";
import { addToast, Button } from "@heroui/react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/features/counter/counter-slice";

export default function Home() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        key="primary"
        color="primary"
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
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
