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
    config.mode = 'production';
    config.optimization = {
      ...config.optimization,
      sideEffects: true, // tells webpack to recognise the sideEffects flag in package.json, ramda is side effects free
      minimize: true, // needs to be set to `true` for proper tree-shaking
      providedExports: true, // if set to `true` it gives far better results
      usedExports: true, // needs to be set to `true` for proper tree-shaking
      concatenateModules: true, // needs to be set to `true` for proper tree-shaking
    };

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
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
      preventFullImport: true,
    },

    'date-fns': {
      transform: 'date-fns/{{member}}',
      preventFullImport: true,
    },
    'date-fns-tz': {
      transform: 'date-fns-tz/{{member}}',
      preventFullImport: true,
    },
    ramda: {
      transform: 'ramda/es/{{member}}',
    },
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
