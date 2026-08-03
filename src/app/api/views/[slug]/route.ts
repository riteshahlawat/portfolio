import { getBlogViewCount, recordBlogView } from "@/server/blog-views";
import { allBlogPosts } from "contentlayer/generated";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

type RouteContext = {
    params: Promise<{ slug: string }>;
};

const validSlugs = new Set(allBlogPosts.map((post) => post._raw.flattenedPath));
const bodySchema = z.object({
    visitorId: z.uuid(),
});

const getSlug = async ({ params }: RouteContext) => {
    const { slug } = await params;
    return validSlugs.has(slug) ? slug : null;
};

const json = (body: unknown, status = 200) =>
    NextResponse.json(body, {
        status,
        headers: {
            "Cache-Control": "no-store",
        },
    });

export async function GET(_request: Request, context: RouteContext) {
    const slug = await getSlug(context);
    if (!slug) {
        return json({ error: "Blog post not found." }, 404);
    }

    return json({
        viewCount: await getBlogViewCount(slug),
    });
}

export async function POST(request: Request, context: RouteContext) {
    const slug = await getSlug(context);
    if (!slug) {
        return json({ error: "Blog post not found." }, 404);
    }

    const body = bodySchema.safeParse(
        await request.json().catch(() => undefined),
    );
    if (!body.success) {
        return json({ error: "A valid visitor ID is required." }, 400);
    }

    return json(await recordBlogView(slug, body.data.visitorId));
}
