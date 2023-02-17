import { SSRConfig } from 'next-i18next';

export interface Translations {
  translations: SSRConfig;
  locale: string;
}

export type I18nNamespaces =
  | '404'
  | 'restricted'
  | 'admin'
  | 'tokenAirdrops'
  | 'allTokens'
  | 'backend'
  | 'common'
  | 'cookiePolicy'
  | 'disclaimer'
  | 'exchangesTop'
  | 'fx'
  | 'fxTop'
  | 'login'
  | 'nftCollection'
  | 'nftCollectionsTop'
  | 'nftExplorer'
  | 'nftinder'
  | 'nftItem'
  | 'portfolio'
  | 'privacyNotice'
  | 'profitAndLoss'
  | 'richestXrplCommunity'
  | 'swap'
  | 'termsAndConditions'
  | 'token'
  | 'tokensHeatmap'
  | 'tokensTop'
  | 'landing'
  | 'tradeList'
  | 'trading'
  | 'trustline'
  | 'xrplStatistics'
  | 'nftsHeatmap'
  | 'dexCompetition';

export interface LocaleProps {
  min?: number;
  max?: number;
  length?: number;
}

export type AvailableLocales = 'en-gb';
