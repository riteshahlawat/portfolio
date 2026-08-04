import { allBlogPosts } from "contentlayer/generated";
import { compareAsc, format, parseISO } from "date-fns";
import LibraryClient, { type LibraryPost } from "./library-client";

export default function Home() {
    const chronological = [...allBlogPosts].sort((a, b) =>
        compareAsc(new Date(a.date), new Date(b.date)),
    );

    const posts: LibraryPost[] = chronological
        .map((post, index) => ({
            slug: post._raw.flattenedPath,
            idx: String(index + 1).padStart(3, "0"),
            title: post.title.toLowerCase(),
            tag: post.tags[0] ?? "misc",
            year: format(parseISO(post.date), "yyyy"),
            dateISO: post.date,
            dateLabel: format(parseISO(post.date), "MMM d").toLowerCase(),
            readTimeMinutes: post.readTimeMinutes,
        }))
        .reverse();

    return <LibraryClient posts={posts} />;
}
