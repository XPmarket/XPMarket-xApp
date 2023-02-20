import { Dispatch, SetStateAction } from 'react';

import { NftSwipeHistoryItem } from '@xpmarket/xpm.api.xpmarket';

export type SetHistoryList = Dispatch<SetStateAction<NftSwipeHistoryItem[]>>;
