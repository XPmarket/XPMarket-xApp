import { FC } from 'react';

import {
  SwipeDirection,
  VoteSwiper,
} from '@xpmarket/xpm.ui.gallery.vote-swiper';

import { SetHistoryList } from '../types';
import { SWIPE_LIST_OPTIONS } from './constants';
import { SwiperItem } from './types';
import { useSwipeListRequest } from './useSwipeListRequest';
import { useSwipeVoteRequest } from './useSwipeVoteRequest';

interface Props {
  setHistoryList: SetHistoryList;
  isAtBreakpoint: boolean;
}

export const NftinderSwiper: FC<Props> = (props) => {
  const { setHistoryList, isAtBreakpoint } = props;
  const { swipeList, setSwipeList, isLoading, isFetching, prefetchBatch } =
    useSwipeListRequest();
  const { voteMutation } = useSwipeVoteRequest();

  return (
    <VoteSwiper
      isMobile={isAtBreakpoint}
      isFetching={isFetching}
      isLoading={isLoading}
      onVote={handleVote}
      prefetchBatch={prefetchBatch}
      setSwipeList={setSwipeList}
      swipeList={swipeList}
      numberOfPrerenderedCards={SWIPE_LIST_OPTIONS.numberOfPrerenderedCards}
    />
  );

  function handleVote(
    numberOfVisibleNfts: number,
    item: SwiperItem,
    direction: SwipeDirection
  ): void {
    if (numberOfVisibleNfts === SWIPE_LIST_OPTIONS.prefetchAtIndex) {
      prefetchBatch();
    }

    voteMutation({
      direction,
      nftId: item.id,
    });

    if (direction === 'right') {
      setHistoryList((prevHistory) => {
        const latestHistory = [item, ...prevHistory];

        return latestHistory;
      });
    }
  }
};
