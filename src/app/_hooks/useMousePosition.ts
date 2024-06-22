import { useState, useEffect } from "react";

type MousePosition = {
  x?: number;
  y?: number;
};

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({});

  useEffect(() => {
    const updateMouseMovePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMouseMovePosition);

    return () => {
      window.removeEventListener("mousemove", updateMouseMovePosition);
    };
  }, []);

  return mousePosition;
};
export default useMousePosition;
