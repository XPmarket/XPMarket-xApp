/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config) {
    return config;
  },
  images: {
    domains: [
      'xumm.app',
      'xpmarket.io',
      'xpcdn.xpmarket.com',
      'cdn.xpmarket.com',
    ],
  },
  i18n,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // CI runs linting before build
  },
  typescript: {
    ignoreBuildErrors: true, // CI runs type-checking before build
  },
  publicRuntimeConfig: {
    appEnv: process.env.NEXT_PUBLIC_APP_ENV,
    baseOrigin: process.env.NEXT_PUBLIC_BASE_ORIGIN,
  },
};

const plugins = [
  {
    root: (config) => withBundleAnalyzer(config),
  },
];
const composed = plugins.reduce(
  (accumulator, plugin) => plugin.root(accumulator),
  nextConfig
);

module.exports = composed;
