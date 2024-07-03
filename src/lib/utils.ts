import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function headerTextToId(header?: string) {
    if (header) {
        return header.trim().toLowerCase().replace(/\s+/g, "-");
    }

    return undefined;
}
