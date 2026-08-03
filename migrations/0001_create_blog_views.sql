CREATE TABLE IF NOT EXISTS blog_view_counts (
    slug TEXT PRIMARY KEY,
    view_count INTEGER NOT NULL DEFAULT 0,
    updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_view_dedup (
    slug TEXT NOT NULL,
    visitor_hash TEXT NOT NULL,
    last_viewed_at INTEGER NOT NULL,
    PRIMARY KEY (slug, visitor_hash)
);

CREATE INDEX IF NOT EXISTS blog_view_dedup_last_viewed_at_idx
    ON blog_view_dedup (last_viewed_at);
