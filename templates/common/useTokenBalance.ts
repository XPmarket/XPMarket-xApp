import { useMemo } from 'react';
import { TFunction, useTranslation } from 'next-i18next';

import { XPMARKET_API } from '@api/xpmarket/constants';
import { useAuth } from '@system/auth/AuthContext';
import {
  CACHE_KEYS,
  FETCH_INTERVAL,
  STALE_TIME,
} from '@system/fetch/constants';
import { formatError } from '@system/fetch/errors';
import { useApiQuery } from '@system/fetch/useApiQuery';
import { AccountObject, GetDexBalancesRo } from '@xpmarket/xpm.api.xpmarket';
import { decodeToken } from '@xpmarket/xpm.system.xrpl';

interface ReturnType {
  balance: number;
  isLoading: boolean;
  isError: boolean;
}

export const useTokenBalance = (token: string | undefined): ReturnType => {
  const { codeHex } = decodeToken(token);
  const { user, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const { isLoading, data, isError } = useApiQuery(
    CACHE_KEYS.balance(user?.address),
    () => requestBalance(t),
    {
      refetchInterval: FETCH_INTERVAL.accountObjects,
      enabled: isAuthenticated,
      staleTime: STALE_TIME.accountObjects,
    }
  );
  const balance = useMemo(
    () => getCcyBalance(codeHex, data?.xrpBalance, data?.accountObjects),
    [codeHex, data?.xrpBalance, data?.accountObjects]
  );

  return {
    balance,
    isLoading,
    isError,
  };
};

const getCcyBalance = (
  ccyToFind: string | undefined,
  xrpBalance: number | undefined,
  accountObjects: AccountObject[] | undefined
): number => {
  let balance = 0;

  if (xrpBalance === undefined || accountObjects === undefined) {
    return balance;
  }

  if (ccyToFind === 'XRP') {
    balance = xrpBalance;
  }

  const foundObj = accountObjects.find((accObj) =>
    'balance' in accObj ? accObj.currency === ccyToFind : false
  );

  if (foundObj && 'balance' in foundObj) {
    balance = Number(foundObj.balance);
  }

  return balance;
};

const requestBalance = async (t: TFunction): Promise<GetDexBalancesRo> => {
  try {
    const res = await XPMARKET_API.dex.getDexBalances();

    return res;
  } catch (error) {
    throw formatError({
      error,
      message: t('common:errors.balanceFetchFail'),
      showToast: true,
    });
  }
};
