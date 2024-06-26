"use client";

import { midScreenYAtom } from "@/app/_state/atoms";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { useWindowScrollPosition } from "rooks";
export default function ActiveSectionUpdater() {
  const { scrollY } = useWindowScrollPosition();
  const setMidScreenY = useSetAtom(midScreenYAtom);

  useEffect(() => {
    setMidScreenY({
      scrollY: scrollY,
      windowHeight: window.innerHeight,
    });
  }, [scrollY, setMidScreenY]);

  return <></>;
}
