import { IndexSignature } from '@xpmarket/xpm.system.types';

import { FloorPrice } from '../nft/types';
import { XpmarketResponse } from '../types';

export interface GetTopHeaderRo extends XpmarketResponse {
  data: TopHeaderData[];
}

export interface GetSummaryRo extends XpmarketResponse {
  data: SummaryData;
}

export interface SummaryData {
  tokens: TopToken[];
  nfts: TopNftCollection[];
}

export interface GetAllTokensRo extends XpmarketResponse {
  data: Omit<TopToken, 'trendline'>[];
}

export interface TopHeaderData {
  id: number;
  code: string;
  issuer: string;
  gravatar: string;
  last_price: number;
  price_change: number;
  title?: string;
}

export interface TopToken {
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
  volume_dex: string;
  volume: string;
  sparkline: number[];
  title?: string;
}

export interface GetTop100Ro extends XpmarketResponse {
  data: TopToken[];
}

export interface GetTokensHeatmapRo extends XpmarketResponse {
  data: TokensHeatmapDataItem[];
}

export interface GetNftsHeatmapRo extends XpmarketResponse {
  data: NftsHeatmapDataItem[];
}

export interface GetExchangesRo extends XpmarketResponse {
  data: ExchangeTopItem[];
}

export interface ExchangeTopItem {
  id: number;
  name: string;
  logo: string;
  url: string;
  updated_at: string;
  total_volume: string;
  weekly_visits: number;
  twitter: string;
  followers: number;
  xrpl_volume: number;
  pair_count: number;
  xrpl_volume_change: number;
}

export interface GetRichestXrplCommunityRo extends XpmarketResponse {
  data: RichestXrplCommunityItem[];
}

export interface RichestXrplCommunityItem {
  id: number;
  code: string;
  issuer: string;
  title: string;
  gravatar: string;
  holders: number;
  twitter: string;
  followers: number;
  balance: number;
  balance48h: number;
  avg: number;
  balanceChange: number;
}

export interface TokensHeatmapDataItem {
  id: string;
  code: string;
  issuer: string | undefined;
  priceUsd: number;
  change: string;
  marketcap: number;
  fillColor: string;
}

export interface NftsHeatmapDataItem {
  id: string;
  name: string;
  volumeXrp: number;
  fillColor: string;
}

export type GetTokensHeatmapRouteParams = IndexSignature<{
  period: TokensHeatmapPeriod;
}>;

export type GetNftsHeatmapRouteParams = IndexSignature<{
  period: NftsHeatmapPeriod;
}>;

export type TokensHeatmapPeriod = 'daily' | 'weekly' | 'monthly';

export type NftsHeatmapPeriod = '1day' | '7day' | '30day' | 'max';

export type NftCollectionsTopPeriod = '1day' | '7day' | '30day' | 'max';

export type GetNftCollectionsTopRouteParams = IndexSignature<{
  period: NftCollectionsTopPeriod;
}>;

export interface GetNftCollectionsTopRo extends XpmarketResponse {
  data: TopNftCollection[];
}

export interface TopNftCollection {
  collectionId: string;
  name: string;
  valuation: number;
  volume: number;
  volumeUsd: number;
  floorPrice: FloorPrice | null;
  topPrice: string;
  txns: number;
  cheapestCurrency: string;
  followers: number;
  assets: number;
  owners: number;
  ownersPercent: number;
  twitter?: string;
  image?: string;
}
