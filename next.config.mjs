/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/series/tags",
        destination: "https://api.stlouisfed.org/fred/series/tags",
      },
      {
        source: "/series/observations",
        destination: "https://api.stlouisfed.org/fred/series/observations",
      },
    ];
  },
};

export default nextConfig;
