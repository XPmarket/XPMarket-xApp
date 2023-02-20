import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Stack, Typography } from '@mui/material';
import { NftSwipeHistoryItem } from '@xpmarket/xpm.api.xpmarket';
import { HeartIcon } from '@xpmarket/xpm.ui.icons.heart-icon';

import { NftinderHistoryList } from './nftinder-history-list/NftinderHistoryList';

interface Props {
  historyList: NftSwipeHistoryItem[];
  isLoading: boolean;
  isAtBreakpoint: boolean;
}

export const NftinderHistoryPanel: FC<Props> = (props) => {
  const { historyList, isLoading, isAtBreakpoint } = props;
  const { t } = useTranslation();

  return (
    <Stack spacing={2} width="100%" height="100%">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        color={(theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.static.dove
            : theme.palette.static.dusty
        }
      >
        <HeartIcon />
        <Typography fontSize={14} fontWeight="fontWeightBold">
          {t('nftinder:history.title')}
        </Typography>
      </Stack>
      <NftinderHistoryList
        historyList={historyList}
        isLoading={isLoading}
        isAtBreakpoint={isAtBreakpoint}
      />
    </Stack>
  );
};
