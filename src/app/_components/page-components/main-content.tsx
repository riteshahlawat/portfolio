import AboutMe from "./about-me";
import Experience from "./experience";
import Projects from "./projects";
import SectionDivider from "./section-divider";

export default function MainContent() {
  return (
    <div className="text-sm md:ml-[45%] md:w-[55%]">
      <SectionDivider sectionName="About" />
      <AboutMe />
      <SectionDivider sectionName="Experience" className="mt-20" />
      <Experience />
      <SectionDivider sectionName="Projects" className="mt-20" />
      <Projects />
    </div>
  );
}
