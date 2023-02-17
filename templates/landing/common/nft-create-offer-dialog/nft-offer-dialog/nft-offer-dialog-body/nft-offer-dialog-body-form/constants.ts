import { Option } from '@xpmarket/xpm.ui.inputs.types';

import { NftOfferInitialFormValues } from './types';

export const DEFAULT_VALUES: NftOfferInitialFormValues = {
  amount: null,
  duration: null,
  date: null,
  amountToken: 'XRP',
};

export const NFT_OFFER_TOKEN_OPTIONS: Option<string>[] = [
  {
    label: 'XRP',
    value: 'XRP',
  },
];
