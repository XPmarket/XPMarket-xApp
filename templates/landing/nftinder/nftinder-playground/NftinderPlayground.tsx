import { FC } from 'react';

import { Stack, useMediaQuery } from '@mui/material';
import { useThemeConfig } from '@xpmarket/xpm.system.theme-provider';

import { NftinderHistory } from './nftinder-history/NftinderHistory';
import { NftinderSwiper } from './nftinder-swiper/NftinderSwiper';
import { useSwipeHistoryRequest } from './useSwipeHistoryRequest';

export const NftinderPlayground: FC = () => {
  const { historyList, setHistoryList, isLoading } = useSwipeHistoryRequest();
  const { applyAdaptiveBreakpoint } = useThemeConfig();
  const isAtMobileBreakpoint = applyAdaptiveBreakpoint(
    useMediaQuery('(max-width:1100px)')
  );

  return (
    <Stack
      direction={isAtMobileBreakpoint ? 'column-reverse' : 'row'}
      justifyContent="center"
      alignItems={isAtMobileBreakpoint ? 'center' : 'flex-start'}
      spacing={3}
    >
      <NftinderHistory
        historyList={historyList}
        isLoading={isLoading}
        isAtBreakpoint={isAtMobileBreakpoint}
      />
      <NftinderSwiper
        setHistoryList={setHistoryList}
        isAtBreakpoint={isAtMobileBreakpoint}
      />
    </Stack>
  );
};
