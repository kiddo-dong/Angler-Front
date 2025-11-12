import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Angler-Front' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Angler-Front/' : '',
};

export default nextConfig;
