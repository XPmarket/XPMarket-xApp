import { FC } from 'react';

import { Skeleton, Stack } from '@mui/material';

export const NftinderHistoryListSkeleton: FC = () => {
  const mockList = Array(10).fill('');

  return (
    <Stack spacing={1} overflow="auto" p={0.5}>
      {mockList.map((_, index) => (
        <Skeleton key={index} width="100%" height="61px" />
      ))}
    </Stack>
  );
};
