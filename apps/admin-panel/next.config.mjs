/** @type {import('next').NextConfig} */
const nextConfig = {
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
