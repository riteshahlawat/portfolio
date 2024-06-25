import Code from "../code";
import ExternalTextLink from "../links/external-text-link";
import MobileMargin from "./mobile-margin";
import SectionDivider from "./section-divider";

export default function AboutMe() {
  return (
    <div id="about-me" className="flex-col">
      <SectionDivider sectionName="About" />
      <p>
        I'm an awkward blend between full-stack and deep learning. Born to
        descend the gradient, forced to <Code>POST /upload</Code> type of blend.
        I've had the privilege of working in industry & research for deep
        learning, creating my own
        <em> (failed) </em>
        AI startup, and knowing too much about networks for my own good.
        Currently working on Infra @{" "}
        <ExternalTextLink href="https://www.athelas.com/">
          Athelas
        </ExternalTextLink>
        . Originally from Toronto but living in Mountain View right now :)
      </p>
      <p className="mt-3">
        When I'm not at my computer, I'm usually doing olympic weightlifting,
        playing chess, rubbing my cats' belly, or browsing through cat memes :3
      </p>
      <MobileMargin />
    </div>
  );
}
