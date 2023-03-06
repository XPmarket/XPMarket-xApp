import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Divider, Stack, Typography } from '@mui/material';
import { ELLIPSIS_OVERFLOW } from '@xpmarket/xpm.system.theme';
import { Card } from '@xpmarket/xpm.ui.cards.card';
import { AssetAvatar } from '@xpmarket/xpm.ui.gallery.asset-avatar';
import { NumberText } from '@xpmarket/xpm.ui.number.number-text';

interface Props {
  assetLogoSrc: string | undefined;
  assetName: string;
  collectionName: string | undefined;
  lastPriceValue: number;
  lastPriceCurrency: string;
}

export const NftOfferDialogBodyInfo: FC<Props> = (props) => {
  const {
    assetLogoSrc,
    assetName,
    collectionName,
    lastPriceValue,
    lastPriceCurrency,
  } = props;
  const { t } = useTranslation();

  return (
    <Card bgVariant="secondary">
      <Stack direction="row" spacing={1} alignItems="center">
        <AssetAvatar
          variant="square"
          src={assetLogoSrc}
          fallbackText={assetName}
        />
        <Stack maxWidth={280} width="100%">
          <Typography
            fontWeight="fontWeightBold"
            fontSize={14}
            sx={ELLIPSIS_OVERFLOW}
          >
            {assetName}
          </Typography>
          <Typography
            fontWeight="fontWeightRegular"
            fontSize={14}
            color="secondary.main"
            sx={ELLIPSIS_OVERFLOW}
          >
            {collectionName || t('common:unknownCollection')}
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack maxWidth={150} width="100%">
          <Typography
            fontWeight="fontWeightBold"
            fontSize={14}
            sx={ELLIPSIS_OVERFLOW}
          >
            {t('common:nftOfferDialog.lastPrice')}
          </Typography>
          <Typography
            fontWeight="fontWeightRegular"
            fontSize={14}
            color="secondary.main"
            sx={ELLIPSIS_OVERFLOW}
          >
            <NumberText
              value={lastPriceValue}
              suffix={` ${lastPriceCurrency}`}
            />
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
