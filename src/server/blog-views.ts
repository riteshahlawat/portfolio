import "server-only";

import { createDatabaseClient } from "@/server/db/client";

const VIEW_DEDUPLICATION_WINDOW_SECONDS = 24 * 60 * 60;

const getNumericValue = (value: unknown) =>
    typeof value === "number" || typeof value === "bigint" ? Number(value) : 0;

const hashVisitorId = async (visitorId: string) => {
    const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(visitorId),
    );
    return Array.from(new Uint8Array(buf))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
};

export const getBlogViewCount = async (slug: string) => {
    const database = createDatabaseClient();

    try {
        const result = await database.execute({
            sql: `
                SELECT view_count
                FROM blog_view_counts
                WHERE slug = ?
            `,
            args: [slug],
        });

        return getNumericValue(result.rows[0]?.view_count);
    } finally {
        database.close();
    }
};

export const recordBlogView = async (slug: string, visitorId: string) => {
    const visitorHash = await hashVisitorId(visitorId);
    const viewedAt = Math.floor(Date.now() / 1000);
    const expiresBefore = viewedAt - VIEW_DEDUPLICATION_WINDOW_SECONDS;
    const database = createDatabaseClient();
    const transaction = await database.transaction("write");

    try {
        const visit = await transaction.execute({
            sql: `
                INSERT INTO blog_view_dedup (
                    slug,
                    visitor_hash,
                    last_viewed_at
                )
                VALUES (?, ?, ?)
                ON CONFLICT (slug, visitor_hash) DO UPDATE
                SET last_viewed_at = excluded.last_viewed_at
                WHERE blog_view_dedup.last_viewed_at <= ?
                RETURNING last_viewed_at
            `,
            args: [slug, visitorHash, viewedAt, expiresBefore],
        });
        const changed = visit.rows.length > 0;

        const countResult = changed
            ? await transaction.execute({
                  sql: `
                      INSERT INTO blog_view_counts (
                          slug,
                          view_count,
                          updated_at
                      )
                      VALUES (?, 1, ?)
                      ON CONFLICT (slug) DO UPDATE
                      SET
                          view_count = blog_view_counts.view_count + 1,
                          updated_at = excluded.updated_at
                      RETURNING view_count
                  `,
                  args: [slug, viewedAt],
              })
            : await transaction.execute({
                  sql: `
                      SELECT view_count
                      FROM blog_view_counts
                      WHERE slug = ?
                  `,
                  args: [slug],
              });

        await transaction.commit();

        return {
            changed,
            viewCount: getNumericValue(countResult.rows[0]?.view_count),
        };
    } catch (error) {
        if (!transaction.closed) {
            await transaction.rollback();
        }
        throw error;
    } finally {
        if (!transaction.closed) {
            transaction.close();
        }
        database.close();
    }
};
