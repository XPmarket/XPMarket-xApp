import { useCallback, useEffect, useRef, useState } from 'react';
import { QueryKey, useQueryClient } from 'react-query';
import { equals } from 'ramda';

import { useApiMutation } from '@system/fetch/useApiMutation';
import { XpmarketPaginatedResponse } from '@xpmarket/xpm.api.xpmarket';

interface ReturnType<Z, T extends XpmarketPaginatedResponse<Z>> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

interface ServerPaginationOptions<Z, T extends XpmarketPaginatedResponse<Z>> {
  request: () => Promise<T>;
  cacheKey: QueryKey;
  enabled: boolean;
}

const FORCE_REFETCH_KEY = 'force-refetch';

export const useCachedMutation = <Z, T extends XpmarketPaginatedResponse<Z>>(
  options: ServerPaginationOptions<Z, T>
): ReturnType<Z, T> => {
  const { cacheKey, request, enabled } = options;
  const cacheKeyPrevRef = useRef<QueryKey | undefined>(undefined);
  const queryClient = useQueryClient();
  const [data, setData] = useState<T | undefined>(
    queryClient.getQueryData<T | undefined>(cacheKey)
  );
  const handleUpdate = useCallback(
    (onFail?: () => void) => {
      const cachedData = queryClient.getQueryData<T | undefined>(cacheKey);

      if (cachedData && cacheKeyPrevRef.current !== FORCE_REFETCH_KEY) {
        setData(cachedData);
      } else {
        onFail?.();
      }
    },
    [queryClient, cacheKey]
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const { mutate, isError, error } = useApiMutation(request, {
    onSuccess: (data) => {
      if (
        cacheKeyPrevRef.current === FORCE_REFETCH_KEY ||
        equals(cacheKeyPrevRef.current, cacheKey)
      ) {
        setData(data);
      }

      if (cacheKeyPrevRef.current !== FORCE_REFETCH_KEY) {
        queryClient.setQueryData(cacheKey, data);
      }

      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
      handleUpdate();
    },
    onError: () => {
      if (equals(cacheKeyPrevRef.current, cacheKey)) {
        setData(undefined);
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    if (enabled && !equals(cacheKeyPrevRef.current, cacheKey)) {
      cacheKeyPrevRef.current = cacheKey;
      handleUpdate(() => mutate());
    }
  }, [mutate, enabled, handleUpdate, cacheKey]);

  return {
    data,
    refetch: handleRefetch,
    isLoading,
    isError: data?.data.items.length ? false : isError,
    error: data?.data.items.length ? undefined : error,
  };

  function handleRefetch(): void {
    cacheKeyPrevRef.current = FORCE_REFETCH_KEY;

    mutate();
  }
};
