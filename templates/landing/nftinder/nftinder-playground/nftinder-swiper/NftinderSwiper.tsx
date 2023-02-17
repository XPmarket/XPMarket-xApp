import { FC, useRef, useState } from 'react';

import { NftSwipeListItem } from '@api/xpmarket/nft/types';
import { Stack } from '@mui/material';

import { SetHistoryList } from '../types';
import { LikeButtonIcon } from './nftinder-swiper-actions/LikeButton';
import { RejectButtonIcon } from './nftinder-swiper-actions/RejectButton';
import { NftinderSwiperStack } from './nftinder-swiper-stack/NftinderSwiperStack';
import { SWIPE_LIST_OPTIONS } from './constants';
import { NftinderSwiperHelperText } from './NftinderSwiperHelperText';
import { CardRefElement, SwipeDirection } from './types';
import { useSwipeListRequest } from './useSwipeListRequest';
import { useSwipeVoteRequest } from './useSwipeVoteRequest';

interface Props {
  setHistoryList: SetHistoryList;
  isAtBreakpoint: boolean;
}

export const NftinderSwiper: FC<Props> = (props) => {
  const { setHistoryList, isAtBreakpoint } = props;
  const [animatedDirection, setAnimatedDirection] = useState<
    SwipeDirection | undefined
  >(undefined);
  const { swipeList, setSwipeList, isLoading, isFetching, prefetchBatch } =
    useSwipeListRequest();
  const { voteMutation } = useSwipeVoteRequest();
  const [activeDirection, setActiveDirection] = useState<
    SwipeDirection | undefined
  >(undefined);
  const cardRef = useRef<CardRefElement>(null);
  const swipeListValues = Object.values(swipeList);
  const unswipedNfts = swipeListValues.filter(
    (item) => item.swipeDirection === undefined
  );

  return (
    <Stack spacing={3} width="100%" height="100%" maxWidth="437px" pt={5}>
      <NftinderSwiperStack
        unswipedNfts={unswipedNfts}
        setSwipeList={setSwipeList}
        isLoading={isLoading}
        isFetching={isFetching}
        onVote={handleVote}
        cardRef={cardRef}
        onDragDirectionChange={handleDragDirectionChange}
        isAtBreakpoint={isAtBreakpoint}
        prefetchBatch={prefetchBatch}
      />
      <Stack direction="row" justifyContent="center" spacing={3}>
        <RejectButtonIcon
          isActive={activeDirection === 'left'}
          isDisabled={!unswipedNfts.length}
          onClick={() => cardRef.current?.onActionClick('left')}
          isAnimated={!isAtBreakpoint && animatedDirection === 'left'}
          setAnimatedDirection={setAnimatedDirection}
        />
        <LikeButtonIcon
          isActive={activeDirection === 'right'}
          isDisabled={!unswipedNfts.length}
          onClick={() => cardRef.current?.onActionClick('right')}
          isAnimated={!isAtBreakpoint && animatedDirection === 'right'}
          setAnimatedDirection={setAnimatedDirection}
        />
      </Stack>
      {!isAtBreakpoint && <NftinderSwiperHelperText />}
    </Stack>
  );

  function handleDragDirectionChange(
    direction: SwipeDirection | undefined
  ): void {
    setActiveDirection(direction);
  }

  function handleVote(
    numberOfVisibleNfts: number,
    nft: NftSwipeListItem,
    direction: SwipeDirection
  ): void {
    setAnimatedDirection(direction);

    if (numberOfVisibleNfts === SWIPE_LIST_OPTIONS.prefetchAtIndex) {
      prefetchBatch();
    }

    voteMutation({
      direction,
      nftId: nft.id,
    });

    if (direction === 'right') {
      setHistoryList((prevHistory) => {
        const latestHistory = [nft, ...prevHistory];

        return latestHistory;
      });
    }
  }
};
