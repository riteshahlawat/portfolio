import Code from "./code";
import ExternalTextLink from "./external-text-link";

export default function AboutMe() {
  return (
    <div id="about-me" className="flex-col text-sm">
      <p>
        I'm an awkward blend between full-stack and deep learning. Born to
        descend the gradient, forced to <Code>POST /upload</Code> type of blend.
        I've had the privilege of working in industry & research for deep
        learning, creating my own
        <em>
          <b> (failed) </b>
        </em>
        AI startup, and knowing too much about networks for my own good.
        Currently working on Infra @{" "}
        <ExternalTextLink href="https://www.athelas.com/">
          Athelas
        </ExternalTextLink>
        , providing value to the shareholders
      </p>
      <p className="mt-3">Away from my computer I like to...</p>
    </div>
  );
}
