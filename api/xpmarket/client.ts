import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { makeClient } from '@api/common/setup';
import { COOKIE_STORAGE } from '@system/constants';
import { API_BASE, API_BASE_PREFIX } from '@xpmarket/xpm.api.xpmarket';

export const xpmClient = makeClient({
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

xpmClient.interceptors.request.use(mutateRequestConfig, (error) => {
  Promise.reject(error);
});
