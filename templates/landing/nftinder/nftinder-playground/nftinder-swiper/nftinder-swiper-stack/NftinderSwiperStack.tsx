import { Dispatch, FC, RefObject, SetStateAction } from 'react';

import { NftSwipeListItem } from '@api/xpmarket/nft/types';
import { Box } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';

import { SWIPE_LIST_OPTIONS } from '../constants';
import {
  CardRefElement,
  SwipeDirection,
  SwipeList,
  SwipeListItem,
} from '../types';
import { NftinderSwipeCardSkeleton } from './NftinderSwipeCardSkeleton';
import { NftinderSwipeEmptyCard } from './NftinderSwipeEmptyCard';
import { NftinderSwiperCard } from './NftinderSwiperCard';

interface Props {
  unswipedNfts: SwipeListItem[];
  setSwipeList: Dispatch<SetStateAction<SwipeList>>;
  isLoading: boolean;
  isFetching: boolean;
  isAtBreakpoint: boolean;
  prefetchBatch: () => void;
  onVote: (
    numberOfVisibleNfts: number,
    nft: NftSwipeListItem,
    direction: SwipeDirection
  ) => void;
  cardRef: RefObject<CardRefElement>;
  onDragDirectionChange: (direction: SwipeDirection | undefined) => void;
}

export const NftinderSwiperStack: FC<Props> = (props) => {
  const {
    unswipedNfts,
    setSwipeList,
    isLoading,
    isFetching,
    isAtBreakpoint,
    onVote,
    onDragDirectionChange,
    cardRef,
    prefetchBatch,
  } = props;
  const backgroundNfts = [...unswipedNfts]
    .slice(1, SWIPE_LIST_OPTIONS.numberOfPrerenderedCards)
    .reverse();

  return (
    <Box sx={styles.getValue('root')}>
      {unswipedNfts.length ? (
        <>
          {unswipedNfts.length === 1 ? (
            <NftinderSwipeCardSkeleton />
          ) : (
            backgroundNfts.map((backgroundNft) => (
              <NftinderSwiperCard
                key={backgroundNft.nft.id}
                onVote={undefined}
                onDragDirectionChange={undefined}
                nft={backgroundNft.nft}
                isActive={false}
                onImageError={handleError}
                isAtBreakpoint={isAtBreakpoint}
              />
            ))
          )}
          <NftinderSwiperCard
            key={unswipedNfts[0].nft.id}
            ref={cardRef}
            onVote={(result) => handleVote(unswipedNfts[0].nft, result)}
            onDragDirectionChange={onDragDirectionChange}
            nft={unswipedNfts[0].nft}
            isAtBreakpoint={isAtBreakpoint}
            onImageError={handleError}
            isActive
          />
        </>
      ) : (
        <NftinderSwipeEmptyCard
          isLoading={isLoading}
          isFetching={isFetching}
          prefetchBatch={prefetchBatch}
        />
      )}
    </Box>
  );

  function handleError(nft: NftSwipeListItem): void {
    setSwipeList((prevSwipeList) => {
      const latestSwipeList: SwipeList = { ...prevSwipeList };

      latestSwipeList[nft.id] = {
        ...latestSwipeList[nft.id],
        swipeDirection: 'broken',
      };

      return latestSwipeList;
    });
  }

  function handleVote(nft: NftSwipeListItem, direction: SwipeDirection): void {
    setSwipeList((prevSwipeList) => {
      const latestSwipeList: SwipeList = { ...prevSwipeList };

      latestSwipeList[nft.id] = {
        ...latestSwipeList[nft.id],
        swipeDirection: direction,
      };

      return latestSwipeList;
    });

    onVote(unswipedNfts.length, nft, direction);
  }
};

const styles = new SxStyles({
  root: {
    alignSelf: 'center',
    maxWidth: '437px',
    width: {
      xs: '85%',
      sm: '100%',
    },
    aspectRatio: '1',
    position: 'relative',
  },
});
