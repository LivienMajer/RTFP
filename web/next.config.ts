import type { NextConfig } from "next";

// Cache Components is off on purpose: every page is per-user and reads the
// session cookie, so there is no static shell worth prerendering yet.
const nextConfig: NextConfig = {};

export default nextConfig;
