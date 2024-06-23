import AboutMe from "./about-me";
import Experience from "./experience";

export default function MainContent() {
  return (
    <div className="h-full w-[55%] text-sm">
      <AboutMe />
      <Experience />
    </div>
  );
}
