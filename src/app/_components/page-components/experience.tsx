"use client";

import experienceData from "@/app/_data/experience.json";
import ExperienceCard from "../experience-card";
import ExternalLink from "../links/external-link";
import SectionDivider from "./section-divider";
import MobileMargin from "./mobile-margin";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { experienceSectionBoundsAtom } from "@/app/_state/atoms";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);

  const setExperienceBounds = useSetAtom(experienceSectionBoundsAtom);

  useEffect(() => {
    if (ref.current) {
      const bounds = ref.current.getBoundingClientRect();

      setExperienceBounds({
        startY: bounds.top + window.scrollY,
        endY: bounds.bottom + window.scrollY,
      });
    }
  }, [setExperienceBounds]);
  return (
    <div className="mt-0 flex flex-col md:mt-16" id="experience" ref={ref}>
      <SectionDivider sectionName="Experience" />

      {experienceData.map((experience, i) => {
        return <ExperienceCard key={i} experience={experience} />;
      })}
      <ExternalLink className="mt-4">View Full Resume</ExternalLink>
      <MobileMargin />
    </div>
  );
}
