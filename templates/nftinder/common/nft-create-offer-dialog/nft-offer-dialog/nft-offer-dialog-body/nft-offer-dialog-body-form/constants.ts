import { TokenDropdownOption } from '@ui/inputs/styled/token-amount/types';

import { NftOfferInitialFormValues } from './types';

export const DEFAULT_VALUES: NftOfferInitialFormValues = {
  amount: null,
  duration: null,
  date: null,
  amountToken: 'XRP',
};

export const NFT_OFFER_TOKEN_OPTIONS: TokenDropdownOption[] = [
  {
    label: 'XRP',
    value: 'XRP',
    code: 'XRP',
    index: 0,
    title: undefined,
  },
];
