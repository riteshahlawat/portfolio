import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const BlogPost = defineDocumentType(() => ({
    name: "BlogPost",
    filePathPattern: `**/*.md`,
    fields: {
        title: { type: "string", required: true },
        date: { type: "date", required: true },
        image: { type: "string", required: true },
        description: { type: "string", required: true },
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
