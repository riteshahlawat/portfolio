import { spineMetrics } from "@/app/_components/spine-data";
import { OG, OG_SIZE, glowAt, loadOgFonts } from "@/app/_seo/og";
import { SITE } from "@/app/_seo/site";
import { allBlogPosts } from "contentlayer/generated";
import { compareAsc } from "date-fns";
import { ImageResponse } from "next/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${SITE.name} · ${SITE.authorLower}`;

/** Tallest spine the shelf can produce, from spineMetrics: 152 + 5 * 11. */
const MAX_SPINE_HEIGHT = 207;
/** Height budget for the shelf, which sets the scale. */
const SHELF_HEIGHT = 232;
const SCALE = SHELF_HEIGHT / MAX_SPINE_HEIGHT;
/** Widest run that still fits the canvas once the library grows. */
const MAX_SPINES = 16;

export default async function OpengraphImage() {
    const chronological = [...allBlogPosts].sort((a, b) =>
        compareAsc(new Date(a.date), new Date(b.date)),
    );
    // Oldest first, same as the shelf. When there are more books than fit,
    // the most recent ones are the ones worth showing.
    const shown = chronological.slice(-MAX_SPINES);
    const fonts = await loadOgFonts();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px 64px",
                    background: OG.bg,
                    backgroundImage: `${OG.lamp}, ${glowAt("50%", "100%")}`,
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: 20,
                            letterSpacing: "0.34em",
                            color: OG.gold,
                        }}
                    >
                        THE STACKS
                    </div>
                    <div
                        style={{
                            fontFamily: "Newsreader",
                            fontStyle: "italic",
                            fontSize: 62,
                            lineHeight: 1.16,
                            maxWidth: 820,
                            color: OG.heading,
                            marginTop: 22,
                        }}
                    >
                        {SITE.description}
                    </div>
                    <div
                        style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: 20,
                            color: OG.purple,
                            marginTop: 26,
                        }}
                    >
                        ritesh ahlawat · ahlawat.dev
                    </div>
                </div>

                {/* the shelf, built from the real library */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            // Centred, so a three-book library reads as a
                            // shelf rather than a pile in the corner.
                            justifyContent: "center",
                            gap: 9,
                            height: SHELF_HEIGHT,
                        }}
                    >
                        {shown.map((post, position) => {
                            const slug = post._raw.flattenedPath;
                            const { width, height, spine } =
                                spineMetrics(slug);
                            const w = width * SCALE;
                            const h = height * SCALE;
                            const idx = String(
                                chronological.length - shown.length + position + 1,
                            ).padStart(3, "0");

                            return (
                                <div
                                    key={slug}
                                    style={{
                                        width: w,
                                        height: h,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        borderRadius: 4,
                                        background: spine.solid,
                                        // Same gradient the real shelf paints.
                                        backgroundImage: spine.background,
                                        boxShadow:
                                            "inset 3px 0 6px rgba(255,255,255,.09), inset -5px 0 11px rgba(0,0,0,.5), 0 10px 28px rgba(0,0,0,.55)",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: w - 14,
                                            height: 4,
                                            marginTop: 12,
                                            borderRadius: 2,
                                            background: spine.band,
                                        }}
                                    />
                                    <div
                                        style={{ display: "flex", flex: 1 }}
                                    />
                                    <div
                                        style={{
                                            fontFamily: "IBM Plex Mono",
                                            fontSize: 13,
                                            color: spine.meta,
                                            marginBottom: 9,
                                        }}
                                    >
                                        {idx}
                                    </div>
                                    <div
                                        style={{
                                            width: w - 14,
                                            height: 4,
                                            marginBottom: 12,
                                            borderRadius: 2,
                                            background: spine.band,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div
                        style={{
                            width: "100%",
                            height: 13,
                            marginTop: 3,
                            borderRadius: 3,
                            background: OG.shelf,
                        }}
                    />
                </div>
            </div>
        ),
        { ...size, fonts },
    );
}
