import projectsData from "@/app/_data/projects.json";
import ProjectCard from "./project-card";
import SectionDivider from "./section-divider";
import MobileMargin from "./mobile-margin";

export default function Projects() {
  return (
    <div className="mt-0 flex flex-col md:mt-16" id="projects">
      <SectionDivider sectionName="Projects" />

      {projectsData.map((project, i) => {
        return <ProjectCard key={i} project={project} />;
      })}
      <MobileMargin />
    </div>
  );
}
