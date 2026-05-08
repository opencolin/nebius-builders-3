/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/advocates", destination: "/team", permanent: true },
      { source: "/advocates/:slug*", destination: "/team/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
