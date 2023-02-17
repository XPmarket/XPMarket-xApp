import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useTranslation } from 'next-i18next';

import { useAuth } from '@system/auth/AuthContext';

import { handleErrors } from './errors';

export const useApiMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const { onLogout, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return useMutation<TData, TError, TVariables, TContext>(
    (...a) =>
      handleErrors(() => mutationFn(...a), onLogout, isAuthenticated, t),
    options
  );
};
