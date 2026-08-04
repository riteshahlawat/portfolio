// Shared between the bookshelf and the per-post OG images so a link
// preview shows the exact same book that sits on the shelf.

export const SPINES = [
    {
        background: "linear-gradient(160deg,#231c3d,#3a2d68)",
        solid: "#31265a",
        band: "rgba(139,124,248,.5)",
        meta: "#8b7cf8",
    },
    {
        background: "linear-gradient(160deg,#1d1d20,#2c2c31)",
        solid: "#26262b",
        band: "rgba(255,255,255,.18)",
        meta: "#a5a29a",
    },
    {
        background: "linear-gradient(160deg,#1f1a15,#2e2418)",
        solid: "#282013",
        band: "rgba(201,165,94,.45)",
        meta: "#c9a55e",
    },
    {
        background: "linear-gradient(160deg,#1a2030,#263752)",
        solid: "#212c43",
        band: "rgba(122,162,247,.4)",
        meta: "#7aa2f7",
    },
    {
        background: "linear-gradient(160deg,#241e3e,#443177)",
        solid: "#372a5e",
        band: "rgba(168,155,255,.45)",
        meta: "#a89bff",
    },
    {
        background: "linear-gradient(160deg,#1c2320,#2a3a31)",
        solid: "#243029",
        band: "rgba(134,192,161,.35)",
        meta: "#86c0a1",
    },
] as const;

export type Spine = (typeof SPINES)[number];

export const hashString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = (hash * 31 + value.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
};

export const spineMetrics = (slug: string) => {
    const hash = hashString(slug);
    return {
        hash,
        width: 38 + (hash % 5) * 5,
        height: 152 + ((hash >> 3) % 6) * 11,
        spine: SPINES[(hash >> 6) % SPINES.length]!,
    };
};
