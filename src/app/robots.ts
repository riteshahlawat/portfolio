import type { MetadataRoute } from "next";
import { SITE, absolute } from "./_seo/site";

/**
 * Note: Cloudflare sits in front of this origin and can serve its own
 * managed robots.txt (the Content Signals block). If /robots.txt in
 * production does not match this file, the Cloudflare rule is answering
 * instead, and the Sitemap directive has to be added there too.
 *
 * The noindex pages (/quotes, /el-dorado, /blog/000) are deliberately NOT
 * disallowed here. They carry a noindex meta tag, and blocking the crawl
 * would stop Google from ever reading it.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/"],
            },
        ],
        sitemap: absolute("/sitemap.xml"),
        host: SITE.url,
    };
}
