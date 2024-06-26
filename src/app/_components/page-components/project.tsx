"use client";

import projectsData from "@/app/_data/projects.json";
import ProjectCard from "./project-card";
import SectionDivider from "./section-divider";
import MobileMargin from "./mobile-margin";
import { useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { projectsSectionBoundsAtom } from "@/app/_state/atoms";

export default function Project() {
  const ref = useRef<HTMLDivElement>(null);

  const setProjectBounds = useSetAtom(projectsSectionBoundsAtom);

  useEffect(() => {
    if (ref.current) {
      const bounds = ref.current.getBoundingClientRect();

      setProjectBounds({
        startY: bounds.top + window.scrollY,
        endY: bounds.bottom + window.scrollY,
      });
    }
  }, [setProjectBounds]);

  return (
    <div className="mt-0 flex flex-col md:mt-16" id="projects" ref={ref}>
      <SectionDivider sectionName="Projects" />

      {projectsData.map((project, i) => {
        return <ProjectCard key={i} project={project} />;
      })}
      <MobileMargin />
    </div>
  );
}
