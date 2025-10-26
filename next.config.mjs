/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "weikav.com",
      },
      {
        protocol: "https",
        hostname: "akkogear.eu",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "keycapsule.shop",
      },
      {
        protocol: "https",
        hostname: "lumekeebs.com",
      },
      {
        protocol: "https",
        hostname: "keygem.com"
      },
      {
        protocol: "https",
        hostname: "42keebs.eu"
      },
      {
        protocol: "https",
        hostname: "ae-pic-a1.aliexpress-media.com"
      }
    ],
  },
};

export default nextConfig;
