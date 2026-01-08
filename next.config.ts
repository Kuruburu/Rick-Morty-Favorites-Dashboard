import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL("https://rickandmortyapi.com/api/character/avatar/**"),
    ],
  },
};

export default nextConfig;
