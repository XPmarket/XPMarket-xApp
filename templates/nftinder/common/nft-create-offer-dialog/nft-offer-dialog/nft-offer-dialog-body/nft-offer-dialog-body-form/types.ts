import { InferType } from 'yup';

import { schema } from './schema';

export interface NftOfferInitialFormValues {
  amount: number | null;
  amountToken: string;
  duration: number | null | undefined;
  date: Date | null | undefined;
}

export type NftOfferSubmitFormValues = InferType<typeof schema>;
