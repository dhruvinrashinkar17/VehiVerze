/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    resolveAlias: {
      "better-auth/client/plugins": "better-auth/dist/client/plugins/index.mjs",
    },
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
