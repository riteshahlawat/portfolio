import projectsData from "@/app/_data/projects.json";
import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <div className="mt-16 flex flex-col" id="projects">
      {projectsData.map((project, i) => {
        return <ProjectCard key={i} project={project} />;
      })}
    </div>
  );
}
