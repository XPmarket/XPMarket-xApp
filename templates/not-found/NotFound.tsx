import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { APP_ROUTES } from '@system/route/constants';
import { ContentFallback } from '@templates/common/content-fallback/ContentFallback';
import { LinkButton } from '@ui/buttons/LinkButton';

import { Robot404Icon } from './icons/Robot404Icon';

export const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <ContentFallback
      title={t('404:title')}
      description={t('404:description')}
      info={t('404:info')}
      action={
        <LinkButton href={APP_ROUTES.landing.path}>{t('404:back')}</LinkButton>
      }
      icon={
        <Robot404Icon
          sx={{
            fontSize: {
              xs: 400,
              md: 550,
            },
          }}
        />
      }
    />
  );
};
