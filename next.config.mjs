/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
          // Prevent webpack from trying to bundle swisseph
          config.externals.push('swisseph');
        }
        return config;
    },
};

export default nextConfig;
