import { setLocale } from 'yup';

import { LocaleProps } from './types';

export const buildYupLocale = (): void => {
  setLocale({
    mixed: {
      required: 'common:validation.fieldRequired',
    },
    string: {
      email: 'common:validation.string.email',
      min: ({ min }: LocaleProps) => ({
        key: 'common:validation.string.min',
        values: { count: min },
      }),
      max: ({ max }: LocaleProps) => ({
        key: 'common:validation.string.max',
        values: { count: max },
      }),
      length: ({ length }: LocaleProps) => ({
        key: 'common:validation.string.length',
        values: { count: length },
      }),
    },
    array: {
      min: ({ min }: LocaleProps) => ({
        key: 'common:validation.array.min',
        values: { count: min },
      }),
      max: ({ max }: LocaleProps) => ({
        key: 'common:validation.array.max',
        values: { count: max },
      }),
    },
    number: {
      min: ({ min }: LocaleProps) => ({
        key: 'common:validation.number.min',
        values: { count: min },
      }),
      max: ({ max }: LocaleProps) => ({
        key: 'common:validation.string.max',
        values: { count: max },
      }),
    },
  });
};
