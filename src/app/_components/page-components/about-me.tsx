import Code from "../code";
import ExternalTextLink from "../links/external-text-link";

export default function AboutMe() {
  return (
    <div id="about-me" className="flex-col">
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
        playing chess, playing with my cats, or looking at cat memes :3
      </p>
    </div>
  );
}
