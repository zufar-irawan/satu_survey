import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Add path aliases for @/ imports
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['@'] = path.join(__dirname, 'app');
    }
    return config;
  },
  // Alternative: use the experimental featuresRouteImageSizing
};

export default nextConfig;
