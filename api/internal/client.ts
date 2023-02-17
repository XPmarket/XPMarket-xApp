import axios, { AxiosRequestConfig } from 'axios';

import { stringify } from '@xpmarket/xpm.system.routes';

import { getBaseUrl } from './config';

export const client = axios.create({
  paramsSerializer: {
    encode: (params) => stringify(params),
  },
});

const mutateRequestConfig = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  config.baseURL = getBaseUrl();

  if (!config.headers) {
    config.headers = {};
  }

  return config;
};

client.interceptors.request.use(mutateRequestConfig, (error) => {
  Promise.reject(error);
});
