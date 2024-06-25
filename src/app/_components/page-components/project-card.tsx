import type projectData from "@/app/_data/projects.json";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Project = (typeof projectData)[0];

export default function ProjectCard({ project }: { project: Project }) {
  const renderSummary = () => {
    return (
      <>
        {project.summary.split("\n").map((line, idx) => {
          return <p key={idx}>{line}</p>;
        })}
      </>
    );
  };

  const renderSkills = () => {
    return (
      <>
        {project.skills.split(",").map((skill, idx) => {
          return (
            <Badge
              variant="outline"
              key={idx}
              className="border-purple-700 text-purple-200 transition-colors duration-300 group-hover:border-purple-900 group-hover:bg-purple-600"
            >
              {skill.trim()}
            </Badge>
          );
        })}
      </>
    );
  };

  const renderMainCard = () => {
    return (
      <div className="hover:bg-zinc-850 group mt-2 flex w-full flex-row rounded-md px-2 py-3 transition-all duration-300 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg">
        <div className="hidden h-auto min-w-[130px] max-w-[130px] overflow-hidden md:block">
          <Image
            src={project.imageUrl}
            width={500}
            height={0}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              objectPosition: "center",
            }}
            alt={project.imageAltText}
            title={project.imageAltText}
          />
        </div>

        <div className="ml-4 flex flex-auto flex-col">
          <div className="flex w-full flex-row font-bold group-hover:text-purple-400">
            <p>{project.name}</p>
            <ArrowUpRight className="ml-1.5 size-4 font-bold transition-all duration-200 group-hover:-translate-y-[1px] group-hover:translate-x-1" />
          </div>
          {renderSummary()}
          <div className="mb-2 mt-2 block h-auto overflow-hidden md:hidden">
            <Image
              src={project.imageUrl}
              width={500}
              height={0}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                objectPosition: "center",
              }}
              alt={project.imageAltText}
              title={project.imageAltText}
            />
          </div>
          <div className="mt-2 flex flex-row flex-wrap gap-1">
            {renderSkills()}
          </div>
        </div>
      </div>
    );
  };

  if (project.url) {
    return (
      <Link href={project.url} target="_blank">
        {renderMainCard()}
      </Link>
    );
  }

  return <>{renderMainCard()}</>;
}
