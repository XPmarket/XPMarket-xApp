import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { COOKIE_STORAGE } from '@system/constants';
import { ENV } from '@system/env/constants';
import { BASE_API_PROD_URL } from '@system/route/constants';
import { stringify } from '@xpmarket/xpm.system.routes';
import { isServer } from '@xpmarket/xpm.system.storage';

const makeBaseUrl = () => {
  const prodUrl = `${BASE_API_PROD_URL}/api`;

  if (ENV.client.appEnv === 'local') {
    return isServer() ? prodUrl : '/api/ext-03';
  }

  return prodUrl;
};

export const client = axios.create({
  baseURL: makeBaseUrl(),
  paramsSerializer: {
    encode: (params) => stringify(params),
  },
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

client.interceptors.request.use(mutateRequestConfig, (error) => {
  Promise.reject(error);
});
