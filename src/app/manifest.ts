import type { MetadataRoute } from "next";
import { SITE } from "./_seo/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE.authorLower} · ${SITE.name}`,
        short_name: SITE.name,
        description: SITE.homeDescription,
        start_url: "/",
        display: "standalone",
        // The room is dark before a single pixel of the app paints.
        background_color: "#0e0e10",
        theme_color: "#0e0e10",
        icons: [
            {
                src: "/images/brand/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/images/brand/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
