import { Github, Instagram, Linkedin } from "lucide-react";
import ExternalIconLink from "../links/external-icon-link";
import SectionLink from "../section-link";

export default function TLDRSticky() {
  return (
    <div className="flex flex-col justify-between pb-20 md:fixed md:h-full md:w-[40%]">
      <div>
        <h1 className="text-5xl font-semibold text-zinc-200">Ritesh Ahlawat</h1>
        <h3 className="mt-2 text-xl font-normal text-zinc-200">
          Software Engineer
        </h3>
        <p className="mt-4 text-sm font-light ">
          I make things that work... eventually.
        </p>

        <div className="mt-12 flex flex-col">
          <SectionLink text="About" idToScrollTo="about-me" />
          <SectionLink text="Experience" idToScrollTo="experience" />
          <SectionLink text="Projects" idToScrollTo="projects" />
        </div>
      </div>
      <div className="mt-6 flex w-full flex-row gap-2 md:mt-0">
        <ExternalIconLink href="https://github.com/riteshahlawat">
          <Github className="size-5" />
        </ExternalIconLink>
        <ExternalIconLink href="https://www.linkedin.com/in/ritesh-ahlawat/">
          <Linkedin className="size-5" />
        </ExternalIconLink>
        <ExternalIconLink href="https://www.instagram.com/riteshahlawat1">
          <Instagram className="size-5" />
        </ExternalIconLink>
      </div>
    </div>
  );
}
