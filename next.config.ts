/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile react-day-picker to fix ESM issues
  transpilePackages: ["react-day-picker"],
};

module.exports = nextConfig;
