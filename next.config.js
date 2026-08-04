/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    async redirects() {
        return [
            {
                // The apex is the canonical host: it is what metadataBase,
                // every canonical, and every sitemap entry declare. www points
                // at the same project, so fold it into the apex rather than
                // serving the whole site at two addresses.
                source: "/:path*",
                has: [{ type: "host", value: "www.ahlawat.dev" }],
                destination: "https://ahlawat.dev/:path*",
                permanent: true,
            },
            {
                // The library index is the homepage. /blog is a leftover from
                // the old site and still collects links, so it moves
                // permanently instead of bouncing through a React render.
                source: "/blog",
                destination: "/",
                permanent: true,
            },
        ];
    },
};

export default config;
