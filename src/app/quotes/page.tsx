import ShrineClient from "./shrine-client";
import { absolute, sharedOpenGraph } from "@/app/_seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "the shrine",
    robots: { index: false, follow: false },
    // Self-referencing: without it this inherits the root layout's canonical
    // and declares itself to be the homepage.
    alternates: { canonical: "/quotes" },
    openGraph: { ...sharedOpenGraph, url: absolute("/quotes") },
};

export default function Quotes() {
    return <ShrineClient />;
}
