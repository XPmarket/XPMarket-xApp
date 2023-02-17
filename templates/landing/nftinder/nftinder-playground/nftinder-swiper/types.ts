import { Dispatch, SetStateAction } from 'react';

import { NftSwipeListItem } from '@api/xpmarket/nft/types';

export type SwipeDirection = 'left' | 'right' | 'broken';

export interface CardRefElement {
  onActionClick: (direction: SwipeDirection) => void;
}

export type SwipeList = Record<string, SwipeListItem>;

export interface SwipeListItem {
  nft: NftSwipeListItem;
  swipeDirection: SwipeDirection | undefined;
}

export interface VoteMutationVariables {
  nftId: string;
  direction: SwipeDirection;
}

export type SetActionAnimation = Dispatch<
  SetStateAction<SwipeDirection | undefined>
>;
