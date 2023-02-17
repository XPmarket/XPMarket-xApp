import { InferType, TypeOf } from 'yup';

import { schema } from './schema';

export type NftOfferInitialFormValues = TypeOf<typeof schema>;

export type NftOfferSubmitFormValues = InferType<typeof schema>;
