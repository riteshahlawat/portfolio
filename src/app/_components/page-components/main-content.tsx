import AboutMe from "./about-me";
import Experience from "./experience";
import Project from "./project";

export default function MainContent() {
  return (
    <div className="text-sm md:ml-[45%] md:w-[55%]">
      <AboutMe />
      <Experience />
      <Project />
    </div>
  );
}
