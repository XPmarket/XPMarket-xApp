import { FC } from 'react';

import { BoxProps, Breakpoint, Stack } from '@mui/material';
import { CardSkeleton } from '@xpmarket/xpm.ui.loaders.card-skeleton';

import { ContentLayout } from './ContentLayout';

interface Props {
  maxWidth: Breakpoint | BoxProps['maxWidth'];
}

/**
 * Generic content layout
 */
export const ContentLayoutSkeleton: FC<Props> = (props) => {
  const { maxWidth } = props;

  return (
    <ContentLayout
      maxWidth={maxWidth}
      sx={{
        height: '100%',

        '.spacer-content': {
          height: 'inherit',

          '.content-layout-wrapper': {
            height: 'inherit',
          },
        },
      }}
    >
      <Stack spacing={1} height="100%">
        <CardSkeleton width="100%" height="10%" />
        <CardSkeleton width="100%" height="10%" />
        <Stack direction="row" spacing={1} height="40%">
          <CardSkeleton width="20%" />
          <CardSkeleton width="80%" />
        </Stack>
        <CardSkeleton width="100%" height="40%" />
      </Stack>
    </ContentLayout>
  );
};
