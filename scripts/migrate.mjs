import { readFile } from "node:fs/promises";

import { createClient } from "@tursodatabase/serverless/compat";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !authToken) {
    throw new Error(
        "TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are required to run migrations.",
    );
}

const database = createClient({ url, authToken });
const migration = await readFile(
    new URL("../migrations/0001_create_blog_views.sql", import.meta.url),
    "utf8",
);

try {
    await database.executeMultiple(migration);
    console.log("Applied Turso database migrations.");
} finally {
    database.close();
}
