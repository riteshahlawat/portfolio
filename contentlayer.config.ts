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
    },
}));

export default makeSource({
    contentDirPath: "blogs",
    documentTypes: [BlogPost],
});
