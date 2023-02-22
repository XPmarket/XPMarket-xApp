import { Dispatch, SetStateAction } from 'react';

import { SwiperItem } from './nftinder-swiper/types';

export type SetHistoryList = Dispatch<SetStateAction<SwiperItem[]>>;
