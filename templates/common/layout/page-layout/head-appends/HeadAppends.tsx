import { FC } from 'react';
import Head from 'next/head';

import { useTheme } from '@mui/material';

export const HeadAppends: FC = () => {
  const theme = useTheme();

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta name="theme-color" content={theme.palette.background.default} />
    </Head>
  );
};
