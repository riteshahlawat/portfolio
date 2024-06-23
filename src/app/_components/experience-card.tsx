import experienceData from "@/app/_data/experience.json";

type Experience = (typeof experienceData)[0];

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div className="flex w-full flex-row">
      <div>
        <p>
          {experience.startDate} - {experience.endDate}
        </p>
      </div>
    </div>
  );
}
