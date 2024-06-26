"use client";

import { Github, Instagram, Linkedin } from "lucide-react";
import ExternalIconLink from "../links/external-icon-link";
import SectionLink from "../section-link";
import { useAtomValue } from "jotai";
import { activeSectionAtom } from "@/app/_state/atoms";

export default function TLDRSticky() {
    const activeSection = useAtomValue(activeSectionAtom);

    return (
        <div className=" flex flex-col justify-between pb-6 md:fixed md:h-full md:w-fit md:pb-36">
            <div>
                <h1 className="text-5xl font-semibold text-zinc-200">
                    Ritesh Ahlawat
                </h1>
                <h3 className="mt-2 text-xl font-normal text-zinc-200">
                    Software Engineer
                </h3>
                <p className="mt-4 text-sm font-light ">
                    I make things that work... eventually.
                </p>

                <div className="mt-12 hidden flex-col md:flex ">
                    <SectionLink
                        text="About"
                        idToScrollTo="about-me"
                        active={activeSection == "about"}
                    />
                    <SectionLink
                        text="Experience"
                        idToScrollTo="experience"
                        active={activeSection == "experience"}
                    />
                    <SectionLink
                        text="Projects"
                        idToScrollTo="projects"
                        active={activeSection == "project"}
                    />
                    <SectionLink
                        text="Writing"
                        idToScrollTo="writing"
                        active={activeSection == "writing"}
                    />
                </div>
            </div>
            <div className="mt-6 flex w-full flex-row gap-4 md:mt-0">
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
