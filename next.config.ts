import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cms.optimizely.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.optimizely.com',
      },
      {
        protocol: 'https',
        hostname: '*.cmp.optimizely.com',
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/en',
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
