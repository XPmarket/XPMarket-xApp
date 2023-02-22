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
import { SwipeList } from '@xpmarket/xpm.ui.gallery.vote-swiper';

import { SWIPE_LIST_OPTIONS } from './constants';
import { SwiperItem } from './types';

interface ReturnType {
  swipeList: SwipeList<SwiperItem>;
  setSwipeList: Dispatch<SetStateAction<SwipeList<SwiperItem>>>;
  isLoading: boolean;
  isFetching: boolean;
  prefetchBatch: () => void;
}

export const useSwipeListRequest = (): ReturnType => {
  const [swipeList, setSwipeList] = useState<SwipeList<SwiperItem>>({});
  const { t } = useTranslation();
  const { user, isReady, isAuthenticated } = useAuth();
  const { isLoading, isFetching, refetch } = useApiQuery(
    CACHE_KEYS.swipeList(user?.address),
    () => request(t),
    {
      enabled: isReady && isAuthenticated,
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
  prevSwipeList: SwipeList<SwiperItem>,
  latestListItems: NftSwipeListItem[]
): SwipeList<SwiperItem> => {
  const latestSwipeList: SwipeList<SwiperItem> = { ...prevSwipeList };

  latestListItems.forEach((newListItem) => {
    if (!latestSwipeList[newListItem.id]) {
      latestSwipeList[newListItem.id] = {
        item: newListItem,
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
