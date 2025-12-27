/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "better-auth/client/plugins": "better-auth/dist/client/plugins/index.mjs",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    dangerouslyAllowSVG: true,
    // Next/Image treats local URLs with query strings as separate assets;
    // allow both plain and query-string local paths.
    localPatterns: [{ pathname: "/**" }, { pathname: "/**", search: "**" }],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
