import ElDoradoClient from "./el-dorado-client";
import { absolute, sharedOpenGraph } from "@/app/_seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "el dorado",
    robots: { index: false, follow: false },
    // Self-referencing: without it this inherits the root layout's canonical
    // and declares itself to be the homepage.
    alternates: { canonical: "/el-dorado" },
    openGraph: { ...sharedOpenGraph, url: absolute("/el-dorado") },
};

export default function ElDorado() {
    return <ElDoradoClient />;
}
