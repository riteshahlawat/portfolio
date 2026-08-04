import { allBlogPosts } from "contentlayer/generated";

/**
 * Shared plumbing for the generated Open Graph images.
 *
 * Both OG routes render the same room as the site: dark page, warm lamp wash
 * from the top left, real book spines on a shelf. The spine geometry itself
 * comes from _components/spine-data, so a link preview shows the exact book
 * that sits on the shelf at /.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

/**
 * A cooler pool of light on the floor where the books actually stand. The
 * position differs per layout, so each OG route passes its own and layers it
 * under the shared lamp.
 */
export const glowAt = (x: string, y: string, alpha = 0.11) =>
    `radial-gradient(circle at ${x} ${y}, rgba(139,124,248,${alpha}) 0%, rgba(14,14,16,0) 48%)`;

export const OG = {
    bg: "#0e0e10",
    /** The lamp in the corner of the room, same warm corner as LampGlow. */
    lamp: "radial-gradient(circle at 4% -8%, rgba(201,165,94,.20) 0%, rgba(14,14,16,0) 58%)",
    shelf: "linear-gradient(180deg, #33333b, #17171a)",
    heading: "#f2efe8",
    body: "#c6c3bb",
    muted: "#7a7770",
    faint: "#57544e",
    purple: "#8b7cf8",
    gold: "#c9a55e",
} as const;

/**
 * Satori renders with raw font bytes, and Google's css2 endpoint will subset
 * a face down to exactly the characters asked for. Building that character
 * set from the real post titles means one small fetch per family for the
 * whole build, and no tofu when a title picks up an accent.
 */
const CHARSET = (() => {
    const staticCopy =
        "the stacks nº0123456789 ·abcdefghijklmnopqrstuvwxyz" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,'\"!?:;()[]&/-–—…’“”" +
        "ritesh ahlawat ahlawat.dev min read essays essay one page";
    const fromPosts = allBlogPosts
        .map((post) => `${post.title}${post.shortTitle ?? ""}`)
        .join("");
    return [...new Set(`${staticCopy}${fromPosts}`)].join("");
})();

const fontCache = new Map<string, Promise<ArrayBuffer>>();

/** One fetch per family per build, shared by every OG route. */
export const loadFont = (family: string) => {
    const cached = fontCache.get(family);
    if (cached) return cached;

    const promise = (async () => {
        const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
            family,
        )}&text=${encodeURIComponent(CHARSET)}`;
        const css = await (await fetch(url)).text();
        const match = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(
            css,
        );
        if (!match?.[1]) throw new Error(`OG font fetch failed: ${family}`);
        return (await fetch(match[1])).arrayBuffer();
    })();

    fontCache.set(family, promise);
    return promise;
};

/** Newsreader italic for titles, Plex Mono for every label. */
export const loadOgFonts = async () => {
    const [serif, mono] = await Promise.all([
        loadFont("Newsreader:ital@1"),
        loadFont("IBM Plex Mono"),
    ]);
    return [
        { name: "Newsreader", data: serif, style: "italic" as const },
        { name: "IBM Plex Mono", data: mono, style: "normal" as const },
    ];
};
