import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { stringify } from '@xpmarket/xpm.system.routes';

export const makeClient = <D>(
  options: AxiosRequestConfig<D>
): AxiosInstance => {
  return axios.create({
    paramsSerializer: {
      encode: (params) => stringify(params),
    },
    ...options,
  });
};
