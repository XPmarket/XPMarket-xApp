import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import { useTranslation } from 'next-i18next';

import { useAuth } from '@system/auth/AuthContext';

import { handleErrors } from './errors';

export const useApiQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> => {
  const { onLogout, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return useQuery(
    queryKey,
    (...a) => handleErrors(() => queryFn(...a), onLogout, isAuthenticated, t),
    options
  );
};
