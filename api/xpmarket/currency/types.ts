import { IndexSignature } from '@xpmarket/xpm.system.types';

import { XpmarketResponse } from '../types';

export interface GetAdvancedInfoRo extends XpmarketResponse {
  data: AdvancedTokenInfo;
}

export interface GetBasicInfoRo extends XpmarketResponse {
  data: BasicTokenInfo;
}

export interface GetPricesRo extends XpmarketResponse {
  data: CurrencyPoint[];
}

export interface GetVolumesRo extends XpmarketResponse {
  data: CurrencyPoint[];
}

export interface GetRankRo extends XpmarketResponse {
  data: CurrencyPoint[];
}

export interface CurrencyPoint {
  x: string;
  y: string;
}

export type GetAdvancedInfoRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
}>;

export type GetBasicInfoRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
}>;

export type GetPricesRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
  period: TokenChartPeriod;
}>;

export type GetVolumesRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
  period: TokenChartPeriod;
}>;

export type GetRankRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
  period: Extract<TokenChartPeriod, '30d' | 'max'>;
}>;

export type TokenChartPeriod = '1d' | '7d' | '30d' | 'max';

export interface BasicTokenInfo {
  id: number;
  code: string;
  issuer: string;
  title: string;
  twitter: string;
  website: string;
  gravatar: string;
  trustlines: number;
  limit: string;
  marketcap: number;
  circulating: string;
  holders: number;
  hasKyc: boolean;
  hasValidator: boolean;
  isBlackholed: boolean;
  hasSellOrders: boolean;
  tokenCreated: string;
  followers: number;
  description: string;
}

export interface AdvancedTokenInfo {
  id: number;
  code: string;
  issuer: string;
  title: string;
  twitter: string;
  website: string;
  gravatar: string;
  trustlines: number;
  limit: string;
  marketcap: number;
  circulating: string;
  placeInTop: number;
  holders: number;
  issuerFee: number;
  price: number;
  priceXrp: number;
  hasKyc: boolean;
  isDead: boolean;
  isScam: boolean;
  hasValidator: boolean;
  isBlackholed: boolean;
  hasSellOrders: boolean;
  tokenCreated: string;
  followers: number;
  description: string;
  exchanges: Exchange[];
  topHolders: TopHolder[];
  counts: Counts;
  otherTokens: OtherToken[];
}

export interface OtherToken {
  id: number;
  code: string;
  issuer: string;
  gravatar: string;
  marketcap: number;
  trustlines: number;
  holders: number;
  twitter: string;
  followers: number;
  last_price: number;
  xrp_price: number;
  price_change: number;
  price_change_7d: number;
  volume: string;
  sparkline: number[];
  title?: string;
}

interface Counts {
  holders: number;
  trustlines: number;
  holdersDiff: number;
  holdersDiffCount: number;
  trustlinesDiff: number;
  trustlinesDiffCount: number;
  followers: number;
  followersDiff: number;
  followersDiffCount: number;
  totalVolume: number;
  volumeDiff: number;
}

export interface TopHolder {
  currencyId: number;
  holder: string;
  title: string | null;
  balance: string;
  value: number;
  created_at: string;
  updated_at: string;
}

export interface Exchange {
  id: number;
  currencyId: number;
  cexId: number;
  price: string;
  volume: string;
  created_at: string;
  updated_at: string;
  pair: string;
  info: Info;
}

interface Info {
  id: number;
  name: string;
  logo: string;
  url: string;
  api: string;
  class: string;
  pair: string;
  created_at?: string;
  updated_at?: string;
}
