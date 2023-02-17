import { Dispatch, SetStateAction } from 'react';

import { NftSwipeHistoryItem } from '@api/xpmarket/nft/types';

export type SetHistoryList = Dispatch<SetStateAction<NftSwipeHistoryItem[]>>;
