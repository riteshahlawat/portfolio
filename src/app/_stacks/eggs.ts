export const EGG_DEFS = [
    {
        id: "cat",
        icon: "🐈‍⬛",
        name: "cat mode",
        hint: "say hi in their language. or the old cheat code.",
        spoiler: "type :3 anywhere. ↑↑↓↓←→←→ b a. on a phone, triple-tap the copyright.",
        toastLabel: "cat mode :3",
    },
    {
        id: "shrine",
        href: "/quotes",
        icon: "🕯️",
        name: "the shrine",
        hint: "one book on the shelf never got a title.",
        spoiler: "click the thin untitled spine at the end of the shelf.",
        toastLabel: "the shrine",
    },
    {
        id: "candle",
        href: "/quotes",
        icon: "🌬️",
        name: "the candle",
        hint: "in the shrine, try blowing one out.",
        spoiler: "in the shrine, click the candle.",
        toastLabel: "the candle",
    },
    {
        id: "eldorado",
        href: "/el-dorado",
        icon: "🗺️",
        name: "el dorado",
        hint: "hidden where it was declared unreal.",
        spoiler: "in the paradise essay, the gold words are a door.",
        toastLabel: "el dorado",
    },
    {
        id: "zero",
        href: "/blog/000",
        icon: "0️⃣",
        name: "entry nº 000",
        hint: "there is nothing before the first post. look anyway.",
        spoiler: "on nº 001, click the prev link that swears there's nothing there.",
        toastLabel: "entry nº 000",
    },
    {
        id: "notfound",
        href: "/here",
        icon: "🚪",
        name: "the missing page",
        hint: "the last essay ends with a question. click it.",
        spoiler: "the last word of the paradise essay. or any url that doesn't exist.",
        toastLabel: "the missing page",
    },
    {
        id: "polaroid",
        href: "/about",
        icon: "📷",
        name: "the polaroid",
        hint: "hold the photograph like you mean it.",
        spoiler: "on the about page, press and hold the photo.",
        toastLabel: "the polaroid",
    },
] as const;

export type EggId = (typeof EGG_DEFS)[number]["id"];

export const EGG_COUNT = EGG_DEFS.length;
export const EGGS_STORAGE_KEY = "stacks-eggs";
export const CAT_STORAGE_KEY = "stacks-cat";
export const SPOILED_STORAGE_KEY = "stacks-spoiled";
export const LAMP_STORAGE_KEY = "stacks-lamp";
