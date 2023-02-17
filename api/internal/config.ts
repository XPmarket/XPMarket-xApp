import { ENV } from '@system/env/constants';
import { isServer } from '@xpmarket/xpm.system.storage';

export const getBaseUrl = (): string => {
  const host = `http://localhost:${ENV.server.port}/api`;
  const baseUrl = isServer() ? host : '/api';

  return baseUrl;
};
