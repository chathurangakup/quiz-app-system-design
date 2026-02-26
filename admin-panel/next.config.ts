import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["192.168.8.176:4000"],
    },
  },
};

export default nextConfig;
