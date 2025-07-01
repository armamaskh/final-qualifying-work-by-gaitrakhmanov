import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  

  eslint: {
    ignoreDuringBuilds: true },

  env: {
    SERVER_URLSERVER_URL: process.env.SERVER_URL,
    SERVER_URLNEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  }
  
};


export default nextConfig;
