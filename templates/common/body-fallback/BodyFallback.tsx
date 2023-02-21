import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'next-i18next';

import { ContentFallback } from '@templates/common/content-fallback/ContentFallback';
import { BASE_DOMAINS, EXTERNAL_ROUTES } from '@xpmarket/xpm.system.routes';
import { LinkButton } from '@ui/buttons/LinkButton';

import { MaintenanceIcon } from './icons/MaintenanceIcon';

type Props = FallbackProps;

export const BodyFallback: FC<Props> = () => {
  const { t } = useTranslation();

  return (
    <ContentFallback
      title={t('common:contentFallback.title')}
      description={t('common:contentFallback.description')}
      info={t('common:contentFallback.reported')}
      action={
        <LinkButton
          href={BASE_DOMAINS.xpmarket + EXTERNAL_ROUTES.xpmarketTwitter}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {t('common:contentFallback.contactUs')}
        </LinkButton>
      }
      icon={
        <MaintenanceIcon
          sx={{
            fontSize: {
              xs: 450,
              md: 600,
            },
          }}
        />
      }
    />
  );
};
