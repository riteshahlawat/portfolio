import { ImageResponse } from "next/og";
import { allBlogPosts } from "contentlayer/generated";
import { compareAsc } from "date-fns";
import { spineMetrics } from "@/app/_components/spine-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () => {
    return allBlogPosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

// Satori needs raw font data; pull TTFs from Google Fonts at build time.
const loadGoogleFont = async (family: string, text: string) => {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(cssUrl)).text();
    const match = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(
        css,
    );
    if (!match?.[1]) throw new Error(`font fetch failed: ${family}`);
    const response = await fetch(match[1]);
    return response.arrayBuffer();
};

export default async function OpengraphImage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const chronological = [...allBlogPosts].sort((a, b) =>
        compareAsc(new Date(a.date), new Date(b.date)),
    );
    const index = chronological.findIndex(
        (post) => post._raw.flattenedPath === slug,
    );
    const post = chronological[index];
    const idx = String(index + 1).padStart(3, "0");
    const title = (post?.title ?? "the stacks").toLowerCase();
    const { width, height, spine } = spineMetrics(slug);

    const text = `${title}nº ${idx} · ritesh ahlawat · ahlawat.dev · the stacks0123456789`;
    const [serif, mono] = await Promise.all([
        loadGoogleFont("Newsreader:ital@1", text),
        loadGoogleFont("IBM Plex Mono", text),
    ]);

    // Same deterministic spine as the shelf, scaled up 2.2x.
    const spineWidth = width * 2.2;
    const spineHeight = height * 2.2;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    background: "#0e0e10",
                    padding: "0 90px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <div
                        style={{
                            width: spineWidth,
                            height: spineHeight,
                            background: spine.solid,
                            borderRadius: 6,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            boxShadow:
                                "inset 4px 0 8px rgba(255,255,255,.07), inset -6px 0 12px rgba(0,0,0,.45)",
                        }}
                    >
                        <div
                            style={{
                                marginTop: 20,
                                width: spineWidth - 26,
                                height: 6,
                                borderRadius: 3,
                                background: spine.band,
                            }}
                        />
                        <div style={{ flex: 1 }} />
                        <div
                            style={{
                                fontFamily: "IBM Plex Mono",
                                fontSize: 18,
                                color: spine.meta,
                                marginBottom: 14,
                            }}
                        >
                            {idx}
                        </div>
                        <div
                            style={{
                                marginBottom: 18,
                                width: spineWidth - 26,
                                height: 6,
                                borderRadius: 3,
                                background: spine.band,
                            }}
                        />
                    </div>
                    <div
                        style={{
                            width: spineWidth + 70,
                            height: 14,
                            marginTop: 2,
                            borderRadius: 3,
                            background: "#26262b",
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: 80,
                        flex: 1,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: 22,
                            letterSpacing: "0.2em",
                            color: "#57544e",
                        }}
                    >
                        {`Nº ${idx} · THE STACKS`}
                    </div>
                    <div
                        style={{
                            fontFamily: "Newsreader",
                            fontStyle: "italic",
                            fontSize: 64,
                            lineHeight: 1.2,
                            color: "#f2efe8",
                            marginTop: 24,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: 20,
                            color: "#8b7cf8",
                            marginTop: 32,
                        }}
                    >
                        ritesh ahlawat · ahlawat.dev
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "Newsreader",
                    data: serif,
                    style: "italic" as const,
                },
                { name: "IBM Plex Mono", data: mono, style: "normal" as const },
            ],
        },
    );
}
