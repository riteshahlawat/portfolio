/**
 * One source of truth for every identity string and absolute URL the site
 * emits. Metadata, JSON-LD, the sitemap, the OG images, and the visible
 * about-page links all read from here, so markup can never drift from what
 * a reader actually sees on the page.
 */

export const SITE = {
    url: "https://ahlawat.dev",
    /** The library. Used as og:site_name and the WebSite node's name. */
    name: "the stacks",
    author: "Ritesh Ahlawat",
    /** Lowercase, the way the site says it everywhere in chrome. */
    authorLower: "ritesh ahlawat",
    locale: "en_US",
    /** The tagline. Short on purpose: it is the h1, not a meta description. */
    description: "Maybe one day I'll be good at writing.",
    /** What the homepage tells a search result. Long enough not to get rewritten. */
    homeDescription:
        "Essays by Ritesh Ahlawat, an engineer at Mercury. Writing about agency, work, and the things worth doing slowly. The whole library lives on one page.",
} as const;

/**
 * metadataBase absolutizes metadata only, never JSON-LD, and never the
 * strings we hand to satori. Everything that needs a real absolute URL goes
 * through here instead of being concatenated by hand.
 */
export const absolute = (path: string) => new URL(path, SITE.url).toString();

/**
 * Stable node identities so the graph references one entity instead of
 * redefining it per page. These are identifiers, not fetchable pages.
 */
export const ID = {
    person: `${SITE.url}/#ritesh`,
    website: `${SITE.url}/#website`,
} as const;

/**
 * Rendered as the links at the bottom of /about AND emitted as the Person
 * node's sameAs. One array, both jobs, so the two can't disagree.
 */
export const SOCIALS = [
    { label: "github", href: "https://github.com/riteshahlawat" },
    { label: "linkedin", href: "https://www.linkedin.com/in/ritesh-ahlawat/" },
    { label: "instagram", href: "https://www.instagram.com/riteshahlawat1" },
] as const;

/**
 * Shared Open Graph fields. Next REPLACES nested metadata objects wholesale
 * rather than deep-merging them, so any page that declares an `openGraph`
 * must spread this or it silently drops site_name/locale/image. Pages that
 * have their own preview image override `images` after the spread.
 */
export const sharedOpenGraph = {
    siteName: SITE.name,
    locale: SITE.locale,
    // Not `as const`: Next's OpenGraph type wants a mutable OGImage[].
    images: [
        {
            url: absolute("/opengraph-image"),
            width: 1200,
            height: 630,
            alt: `${SITE.name} · ${SITE.authorLower}`,
            type: "image/png",
        },
    ],
};
