import { FC, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

import { useNftOfferDialog } from '@templates/landing/common/nft-create-offer-dialog/useNftOfferDialog';
import { Button } from '@xpmarket/xpm.ui.buttons.button';

interface Props {
  assetLogoSrc: string | undefined;
  assetName: string;
  collectionName: string | undefined;
  lastPriceValue: number;
  lastPriceCurrency: string;
  nftId: string;
}

export const MakeOfferButton: FC<Props> = (props) => {
  const {
    assetLogoSrc,
    assetName,
    collectionName,
    lastPriceValue,
    lastPriceCurrency,
    nftId,
  } = props;
  const { t } = useTranslation();
  const handleSubmitSuccess = useCallback(() => {
    toast.success(t('common:walletDialog.success'));
  }, [t]);
  const { dialog, openDialog } = useNftOfferDialog({
    assetLogoSrc,
    assetName,
    collectionName,
    lastPriceValue,
    lastPriceCurrency,
    nftId,
    type: 'buy',
    onXummSubmitSuccess: handleSubmitSuccess,
  });

  return (
    <>
      <Button onClick={openDialog} fullWidth>
        {t('nftinder:history.makeOffer')}
      </Button>
      {dialog}
    </>
  );
};
