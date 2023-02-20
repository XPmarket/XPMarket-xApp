import { Dispatch, SetStateAction, useState } from 'react';
import { TFunction, useTranslation } from 'next-i18next';

import { XPMARKET_API } from '@api/xpmarket/constants';
import { useAuth } from '@system/auth/AuthContext';
import { CACHE_KEYS } from '@system/fetch/constants';
import { formatError } from '@system/fetch/errors';
import { useApiQuery } from '@system/fetch/useApiQuery';
import {
  GetNftSwipeHistoryRo,
  NftSwipeHistoryItem,
} from '@xpmarket/xpm.api.xpmarket';

import { SWIPE_HISTORY_LIMIT } from './constants';

interface ReturnType {
  historyList: NftSwipeHistoryItem[];
  setHistoryList: Dispatch<SetStateAction<NftSwipeHistoryItem[]>>;
  isLoading: boolean;
}

export const useSwipeHistoryRequest = (): ReturnType => {
  const [historyList, setHistoryList] = useState<NftSwipeHistoryItem[]>([]);
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { isLoading } = useApiQuery(
    CACHE_KEYS.swipeHistory(user?.address),
    () => request(t),
    {
      enabled: isAuthenticated,
      onSuccess: (data) => setHistoryList(data.data),
    }
  );

  return {
    historyList,
    setHistoryList,
    isLoading,
  };
};

const request = async (t: TFunction): Promise<GetNftSwipeHistoryRo> => {
  try {
    const res = await XPMARKET_API.nft.getNftSwipeHistory({
      limit: SWIPE_HISTORY_LIMIT,
    });

    return res;
  } catch (error) {
    throw formatError({
      error,
      message: t('nftinder:errors.swipeHistoryFetchFail'),
      showToast: true,
    });
  }
};
