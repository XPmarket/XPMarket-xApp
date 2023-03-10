import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Stack } from '@mui/material';
import { ContentLayout } from '@templates/common/layout/content-layout/ContentLayout';
import { IntroHeader } from '@xpmarket/xpm.ui.headers.intro-header';

import { NftinderPlayground } from './nftinder-playground/NftinderPlayground';

export const Nftinder: FC = () => {
  const { t } = useTranslation();

  return (
    <ContentLayout
      sx={{
        overflow: 'hidden', // Prevents swiper cards from overflowing
      }}
    >
      <Stack spacing={2}>
        <IntroHeader title={t('nftinder:title')} description={undefined} />
        <NftinderPlayground />
      </Stack>
    </ContentLayout>
  );
};
