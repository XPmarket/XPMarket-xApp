import { FC } from 'react';

import { Box, Skeleton } from '@mui/material';
import { SxStyles } from '@xpmarket/xpm.system.theme';

import { NftinderSwipeCardContainer } from './NftinderSwipeCardContainer';

export const NftinderSwipeCardSkeleton: FC = () => {
  return (
    <Skeleton height="100%" width="100%">
      <NftinderSwipeCardContainer sx={styles.getValue('card')}>
        <Box />
      </NftinderSwipeCardContainer>
    </Skeleton>
  );
};

const styles = new SxStyles({
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
