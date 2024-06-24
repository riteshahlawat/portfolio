import type experienceData from "@/app/_data/experience.json";
import { ArrowUpRight } from "lucide-react";

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
  return (
    <div className="hover:bg-zinc-850 group mt-2 flex w-full cursor-pointer flex-row rounded-md px-2 py-3 transition-all duration-200 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg ">
      <div className="flex-none">
        <p className="text-xs font-bold text-slate-500">
          {new Date(experience.startDate).getFullYear()} —{" "}
          {new Date(experience.endDate).getFullYear()}
        </p>
      </div>
      <div className="ml-2 flex flex-auto flex-col">
        <div className="flex w-full flex-row font-bold group-hover:text-purple-400">
          <p>
            {experience.position} • {experience.company}
          </p>
          <ArrowUpRight className="ml-1.5 size-4 font-bold transition-all duration-200 group-hover:-translate-y-[1px] group-hover:translate-x-1" />
        </div>
        {renderSummary()}
      </div>
    </div>
  );
}
