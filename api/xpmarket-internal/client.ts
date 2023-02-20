import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { COOKIE_STORAGE } from '@system/constants';
import { makeClient } from '@xpmarket/xpm.api.common';
import { API_BASE, API_BASE_PREFIX } from '@xpmarket/xpm.api.xpmarket-internal';

export const xpmInternalClient = makeClient({
  baseURL: `${API_BASE}/${API_BASE_PREFIX}`,
});

const mutateRequestConfig = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const token = Cookies.get(COOKIE_STORAGE.session);
  const { headers } = config;

  if (token && headers) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};

xpmInternalClient.interceptors.request.use(mutateRequestConfig, (error) => {
  Promise.reject(error);
});
