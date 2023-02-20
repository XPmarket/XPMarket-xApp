import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import { Stack } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';
import { Button } from '@xpmarket/xpm.ui.buttons.button';
import { NoDataPlaceholder } from '@xpmarket/xpm.ui.placeholders';

import { NftinderSwipeCardContainer } from './NftinderSwipeCardContainer';

interface Props {
  isLoading: boolean;
  isFetching: boolean;
  prefetchBatch: () => void;
}

export const NftinderSwipeEmptyCard: FC<Props> = (props) => {
  const { isLoading, isFetching, prefetchBatch } = props;
  const { t } = useTranslation();

  return (
    <NftinderSwipeCardContainer sx={styles.getValue('card')}>
      <Stack spacing={2} alignItems="center">
        <NoDataPlaceholder />
        <Button
          onClick={prefetchBatch}
          loading={isLoading || isFetching}
          endIcon={<ReplayRoundedIcon />}
        >
          {t('nftinder:swiper.refresh')}
        </Button>
      </Stack>
    </NftinderSwipeCardContainer>
  );
};

const styles = new SxStyles({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
