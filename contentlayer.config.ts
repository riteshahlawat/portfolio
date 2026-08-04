import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const BlogPost = defineDocumentType(() => ({
    name: "BlogPost",
    filePathPattern: `**/*.md`,
    fields: {
        title: { type: "string", required: true },
        shortTitle: { type: "string", required: false },
        date: { type: "date", required: true },
        // Set this when an essay is meaningfully revised. Feeds the sitemap's
        // lastModified and the BlogPosting dateModified; both fall back to
        // `date`. Git mtimes are useless here: a repo-wide reformat rewrites
        // every one of them at once.
        updated: { type: "date", required: false },
        image: { type: "string", required: true },
        description: { type: "string", required: true },
        tags: { type: "list", of: { type: "string" }, default: [] },
        dropCap: { type: "boolean", default: true },
        quoteAccent: {
            type: "enum",
            options: ["purple", "gold"],
            default: "purple",
        },
    },
    computedFields: {
        url: {
            type: "string",
            resolve: (post) => `/blog/${post._raw.flattenedPath}`,
        },
        readTimeMinutes: {
            type: "number",
            resolve: (doc) => calculateReadingTime(doc.body.raw),
        },
    },
}));

export default makeSource({
    contentDirPath: "blogs",
    disableImportAliasWarning: true,
    documentTypes: [BlogPost],
});

export const calculateReadingTime = (text: string): number => {
    // Step 2: Determine the average reading speed (words per minute)
    const wordsPerMinute = 200;
    // Step 3: Calculate the word count
    const noOfWords = text.split(/\s/g).length;
    // Step 4: Calculate the estimated reading time (in minutes)
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);

    return readTime;
};
