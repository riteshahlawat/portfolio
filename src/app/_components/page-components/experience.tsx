import experienceData from "@/app/_data/experience.json";
import ExperienceCard from "../experience-card";

export default function Experience() {
  return (
    <div className="mt-16 flex flex-col">
      {experienceData.map((experience, i) => {
        return <ExperienceCard key={i} experience={experience} />;
      })}
    </div>
  );
}
