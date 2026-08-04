"use client";

import { useEffect } from "react";
import { type EggId } from "./eggs";
import { useStacks } from "./providers";

export default function GrantEggOnVisit({ id }: { id: EggId }) {
    const { grant } = useStacks();

    useEffect(() => {
        grant(id);
    }, [grant, id]);

    return null;
}
