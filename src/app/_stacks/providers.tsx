"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import {
    CAT_STORAGE_KEY,
    LAMP_STORAGE_KEY,
    EGG_COUNT,
    EGG_DEFS,
    EGGS_STORAGE_KEY,
    SPOILED_STORAGE_KEY,
    type EggId,
} from "./eggs";

type EggState = Partial<Record<EggId, boolean>>;

type StacksContextValue = {
    eggs: EggState;
    eggCount: number;
    grant: (id: EggId) => void;
    resetHunt: () => void;
    catMode: boolean;
    toggleCat: () => void;
    catTail: string;
    lamp: boolean;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    toast: string | null;
};

const StacksContext = createContext<StacksContextValue | null>(null);

export const useStacks = () => {
    const context = useContext(StacksContext);
    if (!context) {
        throw new Error("useStacks must be used within StacksProvider");
    }
    return context;
};

const readStoredEggs = (): EggState => {
    try {
        return JSON.parse(
            localStorage.getItem(EGGS_STORAGE_KEY) ?? "{}",
        ) as EggState;
    } catch {
        return {};
    }
};

const KONAMI = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a",
];

export function StacksProvider({ children }: { children: ReactNode }) {
    const [eggs, setEggs] = useState<EggState>({});
    const [catMode, setCatMode] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [lamp, setLamp] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const eggsRef = useRef<EggState>({});
    const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );

    const showToast = useCallback((message: string, durationMs = 3200) => {
        setToast(message);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), durationMs);
    }, []);

    // A grant can fire from a child's effect before this provider's own
    // hydration effect runs, so grants always merge with localStorage.
    const grant = useCallback(
        (id: EggId) => {
            const current = { ...readStoredEggs(), ...eggsRef.current };
            if (current[id]) return;
            const next = { ...current, [id]: true };
            try {
                localStorage.setItem(EGGS_STORAGE_KEY, JSON.stringify(next));
            } catch {
                // storage unavailable
            }
            eggsRef.current = next;
            setEggs(next);
            const n = EGG_DEFS.filter((d) => next[d.id]).length;
            const def = EGG_DEFS.find((d) => d.id === id);
            showToast(`🥚 ${n}/${EGG_COUNT} found · ${def?.toastLabel ?? id}`);
            if (n === EGG_COUNT) {
                // 7/7: the lamp comes on and stays until the hunt resets.
                try {
                    localStorage.setItem(LAMP_STORAGE_KEY, "1");
                } catch {
                    // storage unavailable
                }
                setLamp(true);
            }
        },
        [showToast],
    );

    useEffect(() => {
        const merged = { ...readStoredEggs(), ...eggsRef.current };
        eggsRef.current = merged;
        setEggs(merged);
        try {
            setCatMode(localStorage.getItem(CAT_STORAGE_KEY) === "1");
            setLamp(localStorage.getItem(LAMP_STORAGE_KEY) === "1");
        } catch {
            // storage unavailable
        }
    }, []);

    useEffect(() => {
        document.title = catMode ? "ritesh ahlawat :3" : "ritesh ahlawat";
    }, [catMode]);

    const toggleCat = useCallback(() => {
        setCatMode((prev) => {
            const next = !prev;
            try {
                localStorage.setItem(CAT_STORAGE_KEY, next ? "1" : "0");
            } catch {
                // storage unavailable
            }
            return next;
        });
    }, []);

    // Granting is idempotent, so re-activation (or a restored session) no-ops.
    useEffect(() => {
        if (catMode) grant("cat");
    }, [catMode, grant]);

    const resetHunt = useCallback(() => {
        try {
            localStorage.setItem(EGGS_STORAGE_KEY, "{}");
            localStorage.setItem(CAT_STORAGE_KEY, "0");
            localStorage.removeItem(SPOILED_STORAGE_KEY);
            localStorage.removeItem(LAMP_STORAGE_KEY);
        } catch {
            // storage unavailable
        }
        eggsRef.current = {};
        setEggs({});
        setCatMode(false);
        setLamp(false);
        showToast("the drawer is empty again. the lamp goes out too.", 2600);
    }, [showToast]);

    useEffect(() => {
        let keyBuffer = "";
        let konamiBuffer: string[] = [];
        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable)
            ) {
                return;
            }
            konamiBuffer.push((event.key || "").toLowerCase());
            if (konamiBuffer.length > 10) konamiBuffer.shift();
            if (
                konamiBuffer.length === 10 &&
                KONAMI.every((k, i) => konamiBuffer[i] === k)
            ) {
                konamiBuffer = [];
                toggleCat();
                return;
            }
            if (event.key === "Escape") {
                setDrawerOpen(false);
                return;
            }
            if (event.key.length === 1) {
                keyBuffer = (keyBuffer + event.key).slice(-2);
                if (keyBuffer === ":3") {
                    keyBuffer = "";
                    toggleCat();
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [toggleCat]);

    const eggCount = EGG_DEFS.filter((d) => eggs[d.id]).length;

    const value = useMemo<StacksContextValue>(
        () => ({
            eggs,
            eggCount,
            grant,
            resetHunt,
            catMode,
            toggleCat,
            catTail: catMode ? " :3" : "",
            lamp,
            drawerOpen,
            setDrawerOpen,
            toast,
        }),
        [
            eggs,
            eggCount,
            grant,
            resetHunt,
            catMode,
            toggleCat,
            lamp,
            drawerOpen,
            toast,
        ],
    );

    return (
        <StacksContext.Provider value={value}>
            {children}
        </StacksContext.Provider>
    );
}
