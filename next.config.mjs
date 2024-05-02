/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/series/observations",
        destination: "https://api.stlouisfed.org/fred/series/observations",
      },
    ];
  },
};

export default nextConfig;
