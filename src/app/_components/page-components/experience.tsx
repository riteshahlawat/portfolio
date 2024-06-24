import experienceData from "@/app/_data/experience.json";
import ExperienceCard from "../experience-card";
import ExternalLink from "../links/external-link";

export default function Experience() {
  return (
    <div className="mt-16 flex flex-col">
      {experienceData.map((experience, i) => {
        return <ExperienceCard key={i} experience={experience} />;
      })}
      <ExternalLink className="mt-4">View Full Resume</ExternalLink>
    </div>
  );
}
