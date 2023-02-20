import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { OfferCreateType } from '@xpmarket/xpm.api.xpmarket';

import { SubmitMutationDto } from '../types';
import { NftOfferDialogBody } from './nft-offer-dialog-body/NftOfferDialogBody';

interface Props {
  onCancel: () => void;
  isOpen: boolean;
  assetLogoSrc: string | undefined;
  assetName: string;
  collectionName: string | undefined;
  lastPriceValue: number;
  lastPriceCurrency: string;
  isLoading: boolean;
  onSubmit: (params: SubmitMutationDto) => void;
  type: OfferCreateType;
}

export const NftOfferDialog: FC<Props> = (props) => {
  const {
    isOpen,
    onCancel,
    assetLogoSrc,
    assetName,
    collectionName,
    lastPriceValue,
    lastPriceCurrency,
    isLoading,
    onSubmit,
    type,
  } = props;
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          m: 2,
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {t(`common:nftOfferDialog.titleByType.${type}`)}
      </DialogTitle>
      <DialogContent>
        <NftOfferDialogBody
          assetLogoSrc={assetLogoSrc}
          assetName={assetName}
          collectionName={collectionName}
          lastPriceValue={lastPriceValue}
          lastPriceCurrency={lastPriceCurrency}
          isLoading={isLoading}
          onSubmit={onSubmit}
          type={type}
        />
      </DialogContent>
    </Dialog>
  );
};
