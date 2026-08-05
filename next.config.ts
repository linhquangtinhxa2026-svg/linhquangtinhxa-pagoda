import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: "http", hostname: "127.0.0.1", port: "8090" },
      {
        protocol: "https",
        hostname: "api.linhquangtinhxa.org",
      },
    ],
  },
};

export default nextConfig;
