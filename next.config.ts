import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/uploads/**",
        search: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/uploads/**",
        search: "",
      },
    ],
  },
  /* config options here */
  // reactStrictMode: false
};

export default nextConfig;
