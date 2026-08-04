import { AboutHeading, CatsLine } from "./about-copy";
import Polaroid from "./polaroid";

export const metadata = {
    title: "about — ritesh ahlawat",
    description:
        "Engineer at Mercury. I run Aranova. Trying to build one coherent life, and to get better at writing.",
};

const JOBS = [
    {
        dates: "2026 — now",
        role: "Software Engineer",
        company: "Mercury",
        bullets: ["Remote, SF Bay Area. Fintech infrastructure."],
    },
    {
        dates: "2024 — 2026",
        role: "Software Engineer",
        company: "Commure",
        bullets: [
            "Architected high-scale payment processing infrastructure (Python/FastAPI, PostgreSQL, Redis) processing $5M+ in healthcare payments across 9 million patient encounters — refactored a legacy system into a scalable architecture supporting real-time encounter-level posting.",
            "Designed and launched a claims reconciliation platform (React, TypeScript, MUI) with 100% adoption across all healthcare sites — led technical design across ops, design, and account management.",
            "Drove an automated insurance detection system in a 2-person team, resubmitting 14k+ claims automatically — saved patients $1.54M out-of-pocket and raised auto-resubmission from 12% to 20%.",
        ],
    },
    {
        dates: "2023 — 2024",
        role: "Software Engineer",
        company: "BlueCat",
        bullets: [
            "Built an internal tool anonymizing customer databases for testing; helped implement a DDNS update distribution service across DNS/DHCP clusters; automated table partitioning via database triggers.",
        ],
    },
    {
        dates: "2021 — 2022",
        role: "ML Research Assistant",
        company: "TMU",
        bullets: [
            "Innovated a novel image-compression ML algorithm for gigapixel image classification — 96.39% accuracy; research submitted to the ImNO conference.",
        ],
    },
    {
        dates: "2021",
        role: "SWE Intern",
        company: "BlueCat",
        bullets: [
            "TLS encryption between DNS/DHCP server channels; 10+ automation tests, 20+ bug fixes.",
        ],
    },
    {
        dates: "2020",
        role: "SWE Intern",
        company: "Ontario MTO",
        bullets: [
            "ML models for highway detection, vehicle tracking, and lane detection — improved real-time performance 775%, enabling 4-stream inference on one GPU.",
        ],
    },
    {
        dates: "2019 — 2021",
        role: "Research Assistant",
        company: "TMU",
        bullets: [
            "Deep-learning speech recognition for single-switch users; built a school management system supporting video calls (WebRTC).",
        ],
    },
];

const SOCIALS = [
    { label: "github", href: "https://github.com/riteshahlawat" },
    {
        label: "linkedin",
        href: "https://www.linkedin.com/in/ritesh-ahlawat/",
    },
    {
        label: "instagram",
        href: "https://www.instagram.com/riteshahlawat1",
    },
];

export default function About() {
    return (
        <main className="mx-auto w-full max-w-[760px] flex-1 px-5 sm:px-8">
            <div className="pt-14">
                <p className="m-0 font-mono text-[12px] text-[#8b7cf8]">
                    about
                </p>
                <AboutHeading />
            </div>
            <div className="flex flex-wrap items-start gap-9 pt-7">
                <div className="min-w-0 flex-1 basis-[320px] text-[15px] leading-[1.8] text-[#b5b2aa]">
                    <p className="m-0">
                        Engineer at{" "}
                        <a
                            href="https://mercury.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#8b7cf8] hover:text-[#a89bff]"
                        >
                            Mercury
                        </a>
                        . Before that, I worked on healthcare payments
                        infrastructure at Commure. At night, I run{" "}
                        <a
                            href="https://aranova.io/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#8b7cf8] hover:text-[#a89bff]"
                        >
                            Aranova
                        </a>
                        , a marketing agency. I like owning problems end to
                        end: the model, the backend, the pixels, and the phone
                        call.
                    </p>
                    <p className="mt-[14px] mb-0">
                        Most of what I believe comes down to agency. Nobody is
                        coming to hand you the life you want, so you build it.
                        I&apos;m drawn to things with long feedback loops and
                        no shortcuts: barbells, chess, companies. Slow is
                        fine. Quitting is not.
                    </p>
                    <CatsLine />
                    <p className="mt-[14px] mb-0">
                        The essays here are practice. I&apos;m trying to
                        become a better writer. It&apos;s going slowly, which
                        is how I know it&apos;s worth doing.
                    </p>
                </div>
                <Polaroid />
            </div>
            <div className="pt-11 pb-[10px]">
                <p className="m-0 mb-[6px] font-mono text-[11px] font-medium tracking-[.14em] text-[#57544e]">
                    EXPERIENCE
                </p>
                {JOBS.map((job) => (
                    <div
                        key={`${job.dates}-${job.company}`}
                        className="flex flex-col gap-1 border-b border-[rgba(255,255,255,.06)] py-[18px] sm:flex-row sm:gap-5"
                    >
                        <span className="flex-none pt-[3px] font-mono text-[12px] text-[#57544e] sm:w-[118px]">
                            {job.dates}
                        </span>
                        <div className="flex-1">
                            <p className="m-0 text-[15px] font-semibold text-[#e8e5dd]">
                                {job.role} · {job.company}
                            </p>
                            {job.bullets.map((bullet) => (
                                <p
                                    key={bullet}
                                    className="mt-2 mb-0 text-[13px] leading-[1.65] text-[#8f8c85]"
                                >
                                    {bullet}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-[30px] pb-[10px]">
                <p className="m-0 mb-3 font-mono text-[11px] font-medium tracking-[.14em] text-[#57544e]">
                    BUILT ALONG THE WAY
                </p>
                <p className="m-0 text-[14px] leading-[1.75] text-[#8f8c85]">
                    <span className="text-[#e8e5dd]">Thia AI</span>: a
                    desktop-native AutoML app, my <em>(failed)</em> AI startup.{" "}
                    <span className="text-[#e8e5dd]">This site</span>: where
                    the writing lives.
                </p>
            </div>
            <div className="flex gap-[18px] pt-[26px] text-[13px]">
                {SOCIALS.map((social) => (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#7a7770] no-underline hover:text-[#8b7cf8]"
                    >
                        {social.label}
                    </a>
                ))}
            </div>
        </main>
    );
}
