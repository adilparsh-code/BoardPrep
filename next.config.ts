import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The starter's Class 9 outline page is superseded by the CISCE Class IX English module.
      { source: "/icse/english/class-9", destination: "/cisce/class-9/english", permanent: false },
    ];
  },
};

export default nextConfig;
