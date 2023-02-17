import axios, { AxiosRequestConfig } from 'axios';

import { stringify } from '@xpmarket/xpm.system.routes';

export const client = axios.create({
  baseURL: '/api/ext-02',
  paramsSerializer: {
    encode: (params) => stringify(params),
  },
});

const mutateRequestConfig = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  if (!config.headers) {
    config.headers = {};
  }

  config.headers = {
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  };

  return config;
};

client.interceptors.request.use(mutateRequestConfig, (error) => {
  Promise.reject(error);
});
