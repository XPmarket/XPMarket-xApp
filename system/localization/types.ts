import { SSRConfig } from 'next-i18next';

export interface Translations {
  translations: SSRConfig;
  locale: string;
}

export type I18nNamespaces =
  | '404'
  | 'backend'
  | 'login'
  | 'nftinder'
  | 'common';

export interface LocaleProps {
  min?: number;
  max?: number;
  length?: number;
}

export type AvailableLocales = 'en-gb';
