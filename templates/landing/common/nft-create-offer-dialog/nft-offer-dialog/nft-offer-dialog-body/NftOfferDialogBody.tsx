import { FC } from 'react';

import { OfferCreateType } from '@api/xpmarket/nft/types';
import { Stack } from '@mui/material';

import { SubmitMutationDto } from '../../types';
import { NftOfferDialogBodyForm } from './nft-offer-dialog-body-form/NftOfferDialogBodyForm';
import { NftOfferDialogBodyInfo } from './NftOfferDialogBodyInfo';

interface Props {
  assetLogoSrc: string | undefined;
  assetName: string;
  collectionName: string | undefined;
  lastPriceValue: number;
  lastPriceCurrency: string;
  isLoading: boolean;
  type: OfferCreateType;
  onSubmit: (params: SubmitMutationDto) => void;
}

export const NftOfferDialogBody: FC<Props> = (props) => {
  const {
    assetLogoSrc,
    assetName,
    collectionName,
    lastPriceValue,
    lastPriceCurrency,
    isLoading,
    type,
    onSubmit,
  } = props;

  return (
    <Stack spacing={4}>
      <NftOfferDialogBodyInfo
        assetLogoSrc={assetLogoSrc}
        assetName={assetName}
        collectionName={collectionName}
        lastPriceValue={lastPriceValue}
        lastPriceCurrency={lastPriceCurrency}
      />
      <NftOfferDialogBodyForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        type={type}
      />
    </Stack>
  );
};
