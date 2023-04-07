import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Stack } from '@mui/material';
import { ContentLayout } from '@templates/common/layout/content-layout/ContentLayout';
import { IntroHeader } from '@xpmarket/xpm.ui.headers.intro-header';
import { HeartIcon } from '@xpmarket/xpm.ui.icons.heart-icon';

import { NftinderPlayground } from './nftinder-playground/NftinderPlayground';

export const Nftinder: FC = () => {
  const { t } = useTranslation();

  return (
    <ContentLayout
      sx={{
        overflow: 'hidden', // Prevents swiper cards from overflowing
      }}
    >
      <Stack spacing={4}>
        <IntroHeader
          title={t('nftinder:pageTitle')}
          description={t('nftinder:pageDescription')}
          renderIcon={(sx) => (
            <HeartIcon
              sx={{
                ...sx,
                color: 'tertiary.main',
              }}
            />
          )}
        />
        <NftinderPlayground />
      </Stack>
    </ContentLayout>
  );
};
