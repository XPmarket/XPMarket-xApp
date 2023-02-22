import { NftSwipeListItem } from '@xpmarket/xpm.api.xpmarket';
import { AnyObjectWithId } from '@xpmarket/xpm.system.types';
import { SwipeDirection } from '@xpmarket/xpm.ui.gallery.vote-swiper';

export type SwiperItem = AnyObjectWithId & NftSwipeListItem;

export interface VoteMutationVariables {
  nftId: string;
  direction: SwipeDirection;
}
