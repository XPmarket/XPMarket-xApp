import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import {
  replaceRouteParams,
  XPMARKET_ROUTES,
} from '@xpmarket/xpm.system.routes';
import { LinkButton } from '@ui/buttons/LinkButton';

interface Props {
  nftId: string;
}

export const BuyNowButton: FC<Props> = (props) => {
  const { nftId } = props;
  const { t } = useTranslation();

  return (
    <LinkButton
      href={replaceRouteParams(XPMARKET_ROUTES.nftItem.path, { id: nftId })}
      target="_blank"
      fullWidth
    >
      {t('nftinder:history.buyNow')}
    </LinkButton>
  );
};
