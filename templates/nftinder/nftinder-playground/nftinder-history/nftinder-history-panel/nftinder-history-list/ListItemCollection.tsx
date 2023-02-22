import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Typography } from '@mui/material';
import {
  BASE_DOMAINS,
  replaceRouteParams,
  XPMARKET_ROUTES,
} from '@xpmarket/xpm.system.routes';
import { ELLIPSIS_OVERFLOW, LINK_OVERFLOW } from '@xpmarket/xpm.system.theme';
import { TextLink } from '@ui/buttons/TextLink';

interface Props {
  nftCollectionId: string | null;
  nftCollection: string | null;
}

export const ListItemCollection: FC<Props> = (props) => {
  const { nftCollectionId, nftCollection } = props;
  const { t } = useTranslation();

  if (nftCollectionId && nftCollection) {
    return (
      <TextLink
        href={
          BASE_DOMAINS.xpmarket +
          replaceRouteParams(XPMARKET_ROUTES.nftCollection.path, {
            id: nftCollectionId,
          })
        }
        fontWeight="fontWeightRegular"
        fontSize={12}
        target="_blank"
        rel="nofollow noopener noreferrer"
        sx={LINK_OVERFLOW}
      >
        {nftCollection}
      </TextLink>
    );
  }

  return (
    <Typography
      fontWeight="fontWeightRegular"
      fontSize={12}
      sx={ELLIPSIS_OVERFLOW}
    >
      {nftCollection ? nftCollection : t('common:unknownCollection')}
    </Typography>
  );
};
