import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },
      {
        protocol: "https",
        hostname: "kota-content.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui.shadcn.com",
      },
    ],
  },
};

export default nextConfig;