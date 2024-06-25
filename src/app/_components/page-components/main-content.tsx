import AboutMe from "./about-me";
import Experience from "./experience";
import Projects from "./projects";

export default function MainContent() {
  return (
    <div className="text-sm md:ml-[45%] md:w-[55%]">
      <AboutMe />
      <Experience />
      <Projects />
    </div>
  );
}
