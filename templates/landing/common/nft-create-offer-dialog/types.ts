import { UseMutateFunction } from 'react-query';

import { OfferCreateType, PostOfferCreateRo } from '@xpmarket/xpm.api.xpmarket';

export type SubmitMutation = UseMutateFunction<
  PostOfferCreateRo,
  unknown,
  SubmitMutationDto,
  unknown
>;

export interface SubmitMutationDto {
  amount: number;
  currency: string;
  currencyIssuer: string | undefined;
  duration: number | undefined;
  date: Date | undefined;
  offerHash: string | undefined;
}

export interface NftOfferDialogOptions {
  assetLogoSrc: string | undefined;
  assetName: string;
  collectionName: string | undefined;
  lastPriceValue: number;
  lastPriceCurrency: string;
  type: OfferCreateType;
  nftId: string;
  /** Must be memoized */
  onXummSubmitSuccess: () => void;
}
