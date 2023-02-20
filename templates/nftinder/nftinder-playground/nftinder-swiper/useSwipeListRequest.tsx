import { Dispatch, SetStateAction, useState } from 'react';
import { TFunction, useTranslation } from 'next-i18next';

import { XPMARKET_API } from '@api/xpmarket/constants';
import { useAuth } from '@system/auth/AuthContext';
import { CACHE_KEYS } from '@system/fetch/constants';
import { formatError } from '@system/fetch/errors';
import { useApiQuery } from '@system/fetch/useApiQuery';
import {
  GetNftSwipeListRo,
  NftSwipeListItem,
} from '@xpmarket/xpm.api.xpmarket';

import { SWIPE_LIST_OPTIONS } from './constants';
import { SwipeList } from './types';

interface ReturnType {
  swipeList: SwipeList;
  setSwipeList: Dispatch<SetStateAction<SwipeList>>;
  isLoading: boolean;
  isFetching: boolean;
  prefetchBatch: () => void;
}

export const useSwipeListRequest = (): ReturnType => {
  const [swipeList, setSwipeList] = useState<SwipeList>({});
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const { isLoading, isFetching, refetch } = useApiQuery(
    CACHE_KEYS.swipeList(user?.address),
    () => request(t),
    {
      enabled: isAuthenticated,
      onSuccess: (data) => {
        setSwipeList((prevSwipeList) => mapSwipeList(prevSwipeList, data.data));
      },
      onError: () => {
        setSwipeList({});
      },
    }
  );

  return {
    swipeList,
    setSwipeList,
    isLoading,
    isFetching,
    prefetchBatch: handlePrefetchBatch,
  };

  function handlePrefetchBatch(): void {
    refetch();
  }
};

const mapSwipeList = (
  prevSwipeList: SwipeList,
  latestListItems: NftSwipeListItem[]
): SwipeList => {
  const latestSwipeList: SwipeList = { ...prevSwipeList };

  latestListItems.forEach((newListItem) => {
    if (!latestSwipeList[newListItem.id]) {
      latestSwipeList[newListItem.id] = {
        nft: newListItem,
        swipeDirection: undefined,
      };
    }
  });

  return latestSwipeList;
};

const request = async (t: TFunction): Promise<GetNftSwipeListRo> => {
  try {
    const res = await XPMARKET_API.nft.getNftSwipeList({
      limit: SWIPE_LIST_OPTIONS.limit,
    });

    return res;
  } catch (error) {
    throw formatError({
      error,
      message: t('nftinder:errors.swipeListFetchFail'),
      showToast: true,
    });
  }
};
