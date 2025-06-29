import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true },

  env: {
    SERVER_URL: process.env.SERVER_URL }
  
};


export default nextConfig;
