import { atom } from "jotai";

type SectionBound = { startY: number; endY: number };
type ScreenInfo = { scrollY: number; windowHeight: number };
export const midScreenYAtom = atom<ScreenInfo>({ scrollY: 0, windowHeight: 0 });

export const aboutSectionBoundsAtom = atom<SectionBound>({
  startY: 0,
  endY: 0,
});
export const experienceSectionBoundsAtom = atom<SectionBound>({
  startY: 0,
  endY: 0,
});
export const projectsSectionBoundsAtom = atom<SectionBound>({
  startY: 0,
  endY: 0,
});

type ActiveSection = "about" | "experience" | "project" | null;

const calculateVisibleAreaPercentage = (
  startY: number,
  endY: number,
  currentYStart: number,
  currentYEnd: number,
) => {
  const visibleStartY = Math.max(startY, currentYStart);
  const visibleEndY = Math.min(endY, currentYEnd);
  const visibleArea = Math.max(0, visibleEndY - visibleStartY);
  const sectionHeight = endY - startY;

  return sectionHeight > 0 ? visibleArea / sectionHeight : 0;
};

export const activeSectionAtom = atom<ActiveSection>((get) => {
  const midScreenY = get(midScreenYAtom);
  const aboutBounds = get(aboutSectionBoundsAtom);
  const experienceBounds = get(experienceSectionBoundsAtom);
  const projectsBounds = get(projectsSectionBoundsAtom);

  const currentYStart = midScreenY.scrollY;
  const currentYEnd = midScreenY.scrollY + midScreenY.windowHeight;

  const aboutVisibleAreaPercentage = calculateVisibleAreaPercentage(
    aboutBounds.startY,
    aboutBounds.endY,
    currentYStart,
    currentYEnd,
  );
  const experienceVisibleAreaPercentage = calculateVisibleAreaPercentage(
    experienceBounds.startY,
    experienceBounds.endY,
    currentYStart,
    currentYEnd,
  );
  const projectsVisibleAreaPercentage = calculateVisibleAreaPercentage(
    projectsBounds.startY,
    projectsBounds.endY,
    currentYStart,
    currentYEnd,
  );

  const maxVisibleAreaPercentage = Math.max(
    aboutVisibleAreaPercentage,
    experienceVisibleAreaPercentage,
    projectsVisibleAreaPercentage,
  );

  if (maxVisibleAreaPercentage == 0) {
    return null;
  }
  if (maxVisibleAreaPercentage === aboutVisibleAreaPercentage) {
    return "about";
  } else if (maxVisibleAreaPercentage === experienceVisibleAreaPercentage) {
    return "experience";
  } else if (maxVisibleAreaPercentage === projectsVisibleAreaPercentage) {
    return "project";
  }

  return null;
});
