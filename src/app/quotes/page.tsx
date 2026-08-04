import ShrineClient from "./shrine-client";

export const metadata = {
    title: "the shrine",
    robots: { index: false, follow: false },
};

export default function Quotes() {
    return <ShrineClient />;
}
