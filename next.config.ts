import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.science.nasa.gov" },
      { protocol: "https", hostname: "epic.gsfc.nasa.gov" },
      { protocol: "https", hostname: "mars.nasa.gov" },
      { protocol: "https", hostname: "mars.jpl.nasa.gov" },
    ],
  },
  async redirects() {
    return [
      { source: "/terre", destination: "/earth", permanent: true },
      { source: "/objets", destination: "/asteroids", permanent: true },
      { source: "/auth", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
