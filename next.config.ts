import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "sdmd.ams3.digitaloceanspaces.com",
      "sdmd-dev.ams3.digitaloceanspaces.com",
    ],
  },
};

export default nextConfig;
