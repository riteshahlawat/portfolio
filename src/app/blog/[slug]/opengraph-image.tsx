import { spineMetrics } from "@/app/_components/spine-data";
import { OG, OG_SIZE, glowAt, loadOgFonts } from "@/app/_seo/og";
import { allBlogPosts } from "contentlayer/generated";
import { compareAsc, format, parseISO } from "date-fns";
import { ImageResponse } from "next/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export const generateStaticParams = () => {
    return allBlogPosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

const MAIN_SCALE = 1.9;
const NEIGHBOUR_SCALE = 1.5;

/** One book, standing. Same geometry the shelf on / uses, scaled up. */
function Spine({
    slug,
    scale,
    label,
    dim,
}: {
    slug: string;
    scale: number;
    label?: string;
    dim?: boolean;
}) {
    const { width, height, spine } = spineMetrics(slug);
    const w = width * scale;
    const h = height * scale;

    return (
        <div
            style={{
                width: w,
                height: h,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 5,
                background: spine.solid,
                // The same gradient the shelf on / paints, so a preview and
                // the real book are the same object.
                backgroundImage: spine.background,
                opacity: dim ? 0.42 : 1,
                boxShadow: dim
                    ? "inset -4px 0 10px rgba(0,0,0,.5)"
                    : "inset 4px 0 8px rgba(255,255,255,.10), inset -6px 0 14px rgba(0,0,0,.5), 0 12px 34px rgba(0,0,0,.6)",
            }}
        >
            <div
                style={{
                    width: w - 18,
                    height: 5,
                    marginTop: 16,
                    borderRadius: 3,
                    background: spine.band,
                }}
            />
            <div style={{ display: "flex", flex: 1 }} />
            {label ? (
                <div
                    style={{
                        fontFamily: "IBM Plex Mono",
                        fontSize: 17,
                        color: spine.meta,
                        marginBottom: 12,
                    }}
                >
                    {label}
                </div>
            ) : null}
            <div
                style={{
                    width: w - 18,
                    height: 5,
                    marginBottom: 16,
                    borderRadius: 3,
                    background: spine.band,
                }}
            />
        </div>
    );
}

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
    const title = post?.title ?? "the stacks";
    const date = post
        ? format(parseISO(post.date), "MMM d, yyyy").toLowerCase()
        : "";

    // The books this one actually sits between on the shelf. Empty at the
    // ends, so a one-post library still renders cleanly.
    const neighbours = [chronological[index - 1], chronological[index + 1]].map(
        (neighbour) => neighbour?._raw.flattenedPath,
    );

    // Long titles step down a size rather than overflowing the column.
    const titleSize = title.length > 46 ? 50 : title.length > 30 ? 58 : 66;
    const fonts = await loadOgFonts();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 80px",
                    background: OG.bg,
                    backgroundImage: `${OG.lamp}, ${glowAt("20%", "64%", 0.13)}`,
                }}
            >
                {/* the shelf */}
                <div
                    style={{
                        width: 320,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            width: 300,
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                            gap: 10,
                        }}
                    >
                        {neighbours[0] ? (
                            <Spine
                                slug={neighbours[0]}
                                scale={NEIGHBOUR_SCALE}
                                dim
                            />
                        ) : null}
                        <Spine slug={slug} scale={MAIN_SCALE} label={idx} />
                        {neighbours[1] ? (
                            <Spine
                                slug={neighbours[1]}
                                scale={NEIGHBOUR_SCALE}
                                dim
                            />
                        ) : null}
                    </div>
                    <div
                        style={{
                            width: 300,
                            height: 13,
                            marginTop: 3,
                            borderRadius: 3,
                            background: OG.shelf,
                        }}
                    />
                </div>

                {/* the catalog card */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        marginLeft: 64,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: 20,
                            letterSpacing: "0.22em",
                            color: OG.faint,
                        }}
                    >
                        {`Nº ${idx} · THE STACKS`}
                    </div>
                    <div
                        style={{
                            fontFamily: "Newsreader",
                            fontStyle: "italic",
                            fontSize: titleSize,
                            lineHeight: 1.18,
                            color: OG.heading,
                            marginTop: 20,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            width: 56,
                            height: 3,
                            marginTop: 30,
                            borderRadius: 2,
                            background: OG.purple,
                        }}
                    />
                    <div
                        style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: 19,
                            color: OG.muted,
                            marginTop: 26,
                        }}
                    >
                        {`${date} · ${post?.readTimeMinutes ?? 0} min read`}
                    </div>
                    <div
                        style={{
                            fontFamily: "IBM Plex Mono",
                            fontSize: 19,
                            color: OG.purple,
                            marginTop: 10,
                        }}
                    >
                        ritesh ahlawat · ahlawat.dev
                    </div>
                </div>
            </div>
        ),
        { ...size, fonts },
    );
}
