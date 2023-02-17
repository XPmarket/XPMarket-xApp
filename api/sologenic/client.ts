import axios, { AxiosRequestConfig } from 'axios';

import { stringify } from '@xpmarket/xpm.system.routes';

export const client = axios.create({
  baseURL: '/api/ext-01',
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

  return config;
};

client.interceptors.request.use(mutateRequestConfig, (error) => {
  Promise.reject(error);
});
