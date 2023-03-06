import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import {
  Divider,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ELLIPSIS_OVERFLOW } from '@xpmarket/xpm.system.theme';
import { useThemeConfig } from '@xpmarket/xpm.system.theme-provider';
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
  const { applyAdaptiveBreakpoint } = useThemeConfig();
  const isAtMobileBreakpoint = applyAdaptiveBreakpoint(
    useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  );

  return (
    <Card bgVariant="secondary">
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={1}
        alignItems={{
          xs: 'flex-start',
          sm: 'center',
        }}
        divider={
          <Divider
            orientation={isAtMobileBreakpoint ? 'horizontal' : 'vertical'}
            flexItem
          />
        }
      >
        <Stack direction="row" spacing={1} alignItems="center" width="100%">
          <AssetAvatar
            variant="square"
            src={assetLogoSrc}
            fallbackText={assetName}
          />
          <Stack maxWidth={280} width="100%" overflow="hidden">
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
        </Stack>
        <Stack
          maxWidth={{
            xs: '100%',
            sm: '150px',
          }}
          width="100%"
        >
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
