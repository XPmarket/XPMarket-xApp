import { FC } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'next-i18next';

import { Stack, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { NftSwipeHistoryItem } from '@xpmarket/xpm.api.xpmarket';

import { NftinderHistoryListItem } from './NftinderHistoryListItem';
import { NftinderHistoryListSkeleton } from './NftinderHistoryListSkeleton';

interface Props {
  historyList: NftSwipeHistoryItem[];
  isLoading: boolean;
  isAtBreakpoint: boolean;
}

export const NftinderHistoryList: FC<Props> = (props) => {
  const { historyList, isLoading, isAtBreakpoint } = props;
  const { t } = useTranslation();

  if (isLoading) {
    return <NftinderHistoryListSkeleton />;
  }

  if (!historyList.length) {
    return (
      <Stack flexGrow={1} justifyContent="center" alignItems="center">
        <Typography
          fontSize={14}
          fontWeight="fontWeightBold"
          color="secondary.dark"
        >
          {t('nftinder:history.empty')}
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={1}
      overflow="auto"
      p={0.5}
      maxWidth={isAtBreakpoint ? '100%' : '520px'}
      component={TransitionGroup}
    >
      {historyList.map((nft) => (
        <Collapse
          key={nft.id}
          sx={{
            flexShrink: 0,
          }}
          timeout={100}
        >
          <NftinderHistoryListItem nft={nft} />
        </Collapse>
      ))}
    </Stack>
  );
};
