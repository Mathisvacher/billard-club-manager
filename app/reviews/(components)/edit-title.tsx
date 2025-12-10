"use client";

import { cn } from "@/src/lib/utils";
import { Check, Edit } from "lucide-react";
import { useRef, useState } from "react";

export default function EditTitle(props: {
  children: string;
  onChangeName?: (newTitle: string) => void;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  if (isEditing) {
    return (
      <div className="group flex items-center gap-2">
        <input
          className={cn(props.className)}
          defaultValue={props.children}
          ref={ref}
          style={{
            fieldSizing: "content",
          }}
        ></input>
        <button
          className="group-hover:opacity-100 opacity-0 p-3 bg-accent"
          onClick={() => {
            setIsEditing(false);
            const newTitle = ref.current?.value ?? "";
            props.onChangeName?.(newTitle);
          }}
        >
          <Check size={16} />
        </button>
      </div>
    );
  }
  return (
    <div className="group flex items-center gap-2">
      <p className={cn(props.className)}>{props.children}</p>
      <button
        className="group-hover:opacity-100 opacity-0 p-3 bg-accent"
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => {
            ref.current?.focus();
          }, 100);
        }}
      >
        <Edit size={16} />
      </button>
    </div>
  );
}
