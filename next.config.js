/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress the 'url' module warning if it's coming from a third-party package
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        url: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
