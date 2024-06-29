import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Redis } from "@upstash/redis";
import { env } from "@/env";

const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ipProcedure = publicProcedure.use(async (opts) => {
    const ip = opts.ctx.headers.get("x-forwarded-for") ?? "127.0.0.1";
    return opts.next({
        ctx: {
            ip: ip,
            ...opts.ctx,
        },
    });
});

const hashIP = async (ip: string) => {
    const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(ip),
    );
    const hash = Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hash;
};

export const blogRouter = createTRPCRouter({
    incrementViewCount: ipProcedure
        .input(z.object({ slug: z.string().min(1) }))
        .mutation(async ({ input, ctx }) => {
            const hashedIP = await hashIP(ctx.ip);

            const isNew = await redis.set(
                ["deduplicate", hashedIP, input.slug].join(":"),
                true,
                {
                    nx: true,
                    ex: 24 * 60 * 60,
                },
            );

            if (!isNew) {
                return {
                    changed: false,
                };
            }
            console.log("Incrementing...");
            await redis.incr(["pageviews", "blogs", input.slug].join(":"));
            return {
                changed: true,
            };
        }),

    viewCount: ipProcedure
        .input(z.object({ slug: z.string().min(1) }))
        .query(async ({ input }) => {
            const amount: number | null = await redis.get(
                ["pageviews", "blogs", input.slug].join(":"),
            );

            return {
                viewCount: amount ?? 0,
            };
        }),
});
