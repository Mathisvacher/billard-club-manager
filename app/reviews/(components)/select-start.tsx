"use client";

import { cn } from "@/src/lib/utils";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";

export default function SelectStar(props: {
  star: number;
  onStarChange?: (start: number) => void;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn("flex items-center gap-1", {
        "animate-pulse": isPending,
      })}
      onMouseLeave={() => {
        setHoverIndex(null);
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < props.star;
        const isNewFilled = hoverIndex ? i - 1 < hoverIndex : null;
        return (
          <button
            key={i}
            onMouseEnter={() => {
              setHoverIndex(i);
            }}
            onClick={() =>
              startTransition(() => {
                props.onStarChange?.(i + 1);
              })
            }
          >
            <Star
              className={cn("text-yellow-400 transition cursor-pointer", {
                "fill-yellow-400": isFilled,
                "-translate-y-0.5 fill-orange-400 text-orange-400": isNewFilled,
              })}
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
