import type { BlogPosting, BreadcrumbList, Graph, WithContext } from "schema-dts";
import { ID, SITE, SOCIALS, absolute } from "./site";

/**
 * Structured data, built from the same objects that render the visible page.
 * Nothing here is hand-typed per page: if a string appears in markup it also
 * appears on screen, which is what keeps the two from drifting.
 *
 * Note there is deliberately no WebSite/SearchAction node. The card catalog
 * ("/" anywhere) is client-side fuzzy nav with no query URL behind it, so a
 * SearchAction would describe an endpoint that does not exist.
 */

/**
 * The anchor entity. A personal site's entity is a Person, not an
 * Organization: everything else in the graph hangs off this @id.
 */
const person = {
    "@type": "Person",
    "@id": ID.person,
    name: SITE.author,
    alternateName: SITE.authorLower,
    url: SITE.url,
    image: absolute("/images/about/DSC06419.jpg"),
    jobTitle: "Software Engineer",
    worksFor: { "@type": "Organization", name: "Mercury", url: "https://mercury.com" },
    homeLocation: { "@type": "Place", name: "San Francisco Bay Area" },
    description:
        "Engineer at Mercury. Runs Aranova at night. Writes essays here as practice.",
    knowsAbout: [
        "Software engineering",
        "Machine learning",
        "Payments infrastructure",
        "Writing",
    ],
    sameAs: SOCIALS.map((social) => social.href),
} as const;

const website = {
    "@type": "WebSite",
    "@id": ID.website,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.authorLower,
    description: SITE.description,
    inLanguage: "en",
    author: { "@id": ID.person },
    publisher: { "@id": ID.person },
} as const;

/** Site-wide graph. Mounted once in the root layout, so it is on every page. */
export const siteGraph: Graph = {
    "@context": "https://schema.org",
    "@graph": [person, website],
};

export type PostSchemaInput = {
    slug: string;
    title: string;
    description: string;
    /** Site-relative, e.g. "/images/blog/foo.png". Absolutized here. */
    image: string;
    datePublished: string;
    dateModified: string;
    tags: readonly string[];
    readTimeMinutes: number;
};

export const buildPostSchema = (
    post: PostSchemaInput,
): WithContext<BlogPosting> => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absolute(`/blog/${post.slug}#post`),
    mainEntityOfPage: absolute(`/blog/${post.slug}`),
    url: absolute(`/blog/${post.slug}`),
    headline: post.title,
    description: post.description,
    // Absolute and stable: metadataBase never touches JSON-LD, and a
    // StaticImageData .src would be a hashed build asset that changes.
    image: absolute(post.image),
    datePublished: new Date(post.datePublished).toISOString(),
    dateModified: new Date(post.dateModified).toISOString(),
    timeRequired: `PT${post.readTimeMinutes}M`,
    keywords: [...post.tags],
    inLanguage: "en",
    isPartOf: { "@id": ID.website },
    author: { "@id": ID.person },
    publisher: { "@id": ID.person },
});

/**
 * The visible crumb on a post reads "library / nº 003". The markup says
 * exactly that, including the leaf, so the two are the same string.
 */
export const buildBreadcrumbSchema = (
    slug: string,
    idx: string,
): WithContext<BreadcrumbList> => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "library",
            item: SITE.url,
        },
        {
            "@type": "ListItem",
            position: 2,
            name: `nº ${idx}`,
            item: absolute(`/blog/${slug}`),
        },
    ],
});
