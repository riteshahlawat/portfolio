import AboutMe from "./about-me";
import Experience from "./experience";
import Projects from "./projects";

export default function MainContent() {
  return (
    <div className="ml-[45%] h-full w-[55%] text-sm">
      <AboutMe />
      <Experience />
      <Projects />
    </div>
  );
}
