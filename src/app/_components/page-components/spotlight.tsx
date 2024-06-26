"use client";

import useMousePosition from "@/app/_hooks/useMousePosition";

export default function Spotlight() {
  const { x, y } = useMousePosition();

  if (x && y) {
    return (
      <div
        className=" pointer-events-none fixed inset-0 z-[1000] transition duration-300"
        style={{
          background: `radial-gradient(circle 500px at ${x}px ${y}px, rgba(47, 36, 140, 0.15), transparent 80%)`,
        }}
      ></div>
    );
  }

  return <></>;
}
