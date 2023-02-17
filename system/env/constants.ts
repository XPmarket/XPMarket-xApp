import getConfig from 'next/config';

import { AppEnv, TypedEnv } from './types';

const { publicRuntimeConfig } = getConfig();
const port = process.env.PORT || '3000';

export const ENV: TypedEnv = {
  client: {
    appEnv: (publicRuntimeConfig.appEnv as AppEnv) || 'local',
    baseOrigin: publicRuntimeConfig.baseOrigin || `http://localhost:${port}`,
  },
  server: {
    prefetchEnabled:
      !!process.env.PREFETCH_ENABLED || process.env.NODE_ENV !== 'development',
    nodeEnv: process.env.NODE_ENV || 'development',
    port,
    xummApiKey: process.env.XUMM_API_KEY,
    xummApiSecret: process.env.XUMM_API_SECRET,
  },
};
