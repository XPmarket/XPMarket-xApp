import { InternalAxiosRequestConfig } from 'axios';

import { makeClient } from '@api/common/setup';
import { LOCAL_STORAGE } from '@system/constants';
import { API_BASE, API_BASE_PREFIX } from '@xpmarket/xpm.api.xpmarket';

export const xpmClient = makeClient({
  baseURL: `${API_BASE}${API_BASE_PREFIX}`,
});

const mutateRequestConfig = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(LOCAL_STORAGE.session);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

xpmClient.interceptors.request.use(mutateRequestConfig, (error) => {
  Promise.reject(error);
});
