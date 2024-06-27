import { atom } from "jotai";

type SectionBound = { startY: number; endY: number };
type ScreenInfo = { scrollY: number; windowHeight: number };

export const scrollInfoAtom = atom<ScreenInfo>({ scrollY: 0, windowHeight: 0 });

export const aboutSectionBoundsAtom = atom<SectionBound>({
    startY: 0,
    endY: 0,
});

export const experienceSectionBoundsAtom = atom<SectionBound>({
    startY: 0,
    endY: 0,
});

export const projectSectionBoundsAtom = atom<SectionBound>({
    startY: 0,
    endY: 0,
});

export const writingSectionBoundsAtom = atom<SectionBound>({
    startY: 0,
    endY: 0,
});

type ActiveSection = "about" | "experience" | "project" | "writing" | null;

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
    const midScreenY = get(scrollInfoAtom);
    const aboutBounds = get(aboutSectionBoundsAtom);
    const experienceBounds = get(experienceSectionBoundsAtom);
    const projectBounds = get(projectSectionBoundsAtom);
    const writingBounds = get(writingSectionBoundsAtom);

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
    const projectVisibleAreaPercentage = calculateVisibleAreaPercentage(
        projectBounds.startY,
        projectBounds.endY,
        currentYStart,
        currentYEnd,
    );
    const writingVisibleAreaPercentage = calculateVisibleAreaPercentage(
        writingBounds.startY,
        writingBounds.endY,
        currentYStart,
        currentYEnd,
    );

    const maxVisibleAreaPercentage = Math.max(
        aboutVisibleAreaPercentage,
        experienceVisibleAreaPercentage,
        projectVisibleAreaPercentage,
        writingVisibleAreaPercentage,
    );

    if (maxVisibleAreaPercentage == 0) {
        return null;
    }
    if (maxVisibleAreaPercentage === aboutVisibleAreaPercentage) {
        return "about";
    } else if (maxVisibleAreaPercentage === experienceVisibleAreaPercentage) {
        return "experience";
    } else if (maxVisibleAreaPercentage === writingVisibleAreaPercentage) {
        return "writing";
    } else if (maxVisibleAreaPercentage === projectVisibleAreaPercentage) {
        return "project";
    }

    return null;
});
