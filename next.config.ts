import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Helps with RSC bundling issues in production
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
