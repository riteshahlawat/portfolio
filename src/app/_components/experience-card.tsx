import type experienceData from "@/app/_data/experience.json";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Experience = (typeof experienceData)[0];

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  const renderSummary = () => {
    return (
      <>
        {experience.summary.split("\n").map((line, idx) => {
          return <p key={idx}>{line}</p>;
        })}
      </>
    );
  };

  const renderSkills = () => {
    if (experience.skills) {
      return (
        <>
          {experience.skills.split(",").map((skill, idx) => {
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
    }
  };

  const renderArrowUpRight = () => {
    if (experience.url) {
      return (
        <ArrowUpRight className="ml-1.5 size-4 font-bold transition-all duration-200 group-hover:-translate-y-[1px] group-hover:translate-x-1" />
      );
    }
  };

  const renderMainCard = () => {
    return (
      <div className="hover:bg-zinc-850 group mt-2 flex w-full flex-row rounded-md px-2 py-3 transition-all duration-300 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg">
        <div className="flex-none">
          <p className="text-xs font-bold text-slate-500">
            {new Date(experience.startDate).getFullYear()} —{" "}
            {experience.endDate
              ? new Date(experience.endDate).getFullYear()
              : "NOW"}
          </p>
        </div>
        <div className="ml-4 flex flex-auto flex-col">
          <div className="flex w-full flex-row font-bold group-hover:text-purple-400">
            <p>
              {experience.position} • {experience.company}
            </p>
            {renderArrowUpRight()}
          </div>
          {renderSummary()}
          <div className="mt-2 flex flex-row flex-wrap gap-1">
            {renderSkills()}
          </div>
        </div>
      </div>
    );
  };

  if (experience.url) {
    return (
      <Link href={experience.url} target="_blank" className="w-full">
        {renderMainCard()}
      </Link>
    );
  }

  return <>{renderMainCard()}</>;
}
