import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy starter routes → board-aware equivalents.
      { source: "/icse/english/class-9", destination: "/icse/class-9/english", permanent: false },
      { source: "/icse/english/class-10", destination: "/icse/english", permanent: false },
      { source: "/icse/english", destination: "/icse/class-9/english", permanent: false },
      // Pre-expansion content tree lived under /cisce; it is now the ICSE board.
      { source: "/cisce", destination: "/icse", permanent: false },
      { source: "/cisce/:path*", destination: "/icse/:path*", permanent: false },
    ];
  },
};

export default nextConfig;
