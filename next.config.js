/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable linting/type-checking during build if you want to force deployment 
  // (Use this only if you are in a rush to see it live)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
