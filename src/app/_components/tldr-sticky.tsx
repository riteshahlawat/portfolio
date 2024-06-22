import SectionLink from "./section-link";

export default function TLDRSticky() {
  return (
    <div className="flex w-[45%] flex-col">
      <h1 className="text-5xl font-semibold text-zinc-200">Ritesh Ahlawat</h1>
      <h3 className="mt-2 text-xl font-normal text-zinc-200">
        Software Engineer
      </h3>
      <p className="mt-4 text-sm font-light ">
        I make things that work... eventually.
      </p>

      <div className="mt-12 flex flex-col">
        <SectionLink text="About" idToScrollTo="about-me" />
        <SectionLink text="Experience" idToScrollTo="about-me" />
        <SectionLink text="Projects" idToScrollTo="about-me" />
      </div>
    </div>
  );
}
