import { ReactNode, useEffect } from 'react';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { xpmClient } from '@api/xpmarket/client';
import { LOCAL_STORAGE } from '@system/constants';

import { useAuth } from './AuthContext';

interface Props {
  children: ReactNode;
}

export const AxiosInterceptors = (props: Props): JSX.Element => {
  const { children } = props;
  const { session } = useAuth();

  useEffect(() => {
    const mutateRequestConfig = (
      config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
      const token = session ?? localStorage.getItem(LOCAL_STORAGE.session);
      // eslint-disable-next-line no-console
      console.log('TOKEN', token);

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    };

    const reqErrorInterceptor = (error: AxiosError): Promise<void> => {
      return Promise.reject(error);
    };

    const interceptor = xpmClient.interceptors.request.use(
      mutateRequestConfig,
      reqErrorInterceptor
    );

    return () => xpmClient.interceptors.request.eject(interceptor);
  }, [session]);

  return <>{children}</>;
};
