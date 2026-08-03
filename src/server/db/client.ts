import "server-only";

import { createClient } from "@tursodatabase/serverless/compat";

import { env } from "@/env";

export const createDatabaseClient = () =>
    createClient({
        url: env.TURSO_DATABASE_URL,
        authToken: env.TURSO_AUTH_TOKEN,
    });
