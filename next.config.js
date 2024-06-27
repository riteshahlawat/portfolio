/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import { withContentlayer } from "next-contentlayer2";

/** @type {import("next").NextConfig} */
const config = {
    swcMinify: true,
};

export default withContentlayer(config);
