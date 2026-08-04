import { allBlogPosts } from "contentlayer/generated";
import type { MetadataRoute } from "next";
import { absolute } from "./_seo/site";

/**
 * Generated from contentlayer, so writing a post is the only step needed to
 * get it listed. Only indexable 200s belong here, which leaves out /blog
 * (redirects to /), and /quotes, /el-dorado and /blog/000 (all noindex).
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const posts = allBlogPosts.map((post) => ({
        url: absolute(`/blog/${post._raw.flattenedPath}`),
        // Real edit dates only. Stamping "today" on every URL every build
        // just teaches Google to ignore the signal.
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "yearly" as const,
        priority: 0.8,
    }));

    // The library index changes whenever the newest post does.
    const newest = posts.reduce<Date | undefined>(
        (latest, post) =>
            !latest || post.lastModified > latest ? post.lastModified : latest,
        undefined,
    );

    return [
        {
            url: absolute("/"),
            lastModified: newest ?? new Date(),
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        {
            url: absolute("/about"),
            lastModified: newest ?? new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        ...posts,
    ];
}
