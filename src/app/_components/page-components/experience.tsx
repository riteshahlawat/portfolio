import experienceData from "@/app/_data/experience.json";
import ExperienceCard from "../experience-card";
import ExternalLink from "../links/external-link";
import SectionDivider from "./section-divider";
import MobileMargin from "./mobile-margin";

export default function Experience() {
  return (
    <div className="mt-0 flex flex-col md:mt-16" id="experience">
      <SectionDivider sectionName="Experience" />

      {experienceData.map((experience, i) => {
        return <ExperienceCard key={i} experience={experience} />;
      })}
      <ExternalLink className="mt-4">View Full Resume</ExternalLink>
      <MobileMargin />
    </div>
  );
}
