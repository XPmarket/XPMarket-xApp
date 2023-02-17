import { XpmarketResponse } from '../types';

export interface GetMainStatsRo extends XpmarketResponse {
  stats: Stats;
  rates: Rate[];
}

export interface Stats {
  cryptos: number;
  trustlines: string;
  holders: string;
  marketcap: number;
  nfts: number;
  nftVolume: number;
  cexVolume: number;
  dexVolume: number;
  xrpPrice: string;
}

export interface Rate {
  iso: string;
  rate: string;
  symbol: string;
}

export interface GetTokenStatisticsRo extends XpmarketResponse {
  data: TokenStatisticsItem[];
}

export interface TokenStatisticsItem {
  date: string;
  cryptos: number;
  trustlines: number;
  holders: number;
  marketcap: string;
  volume: string;
  created_at: string;
  updated_at: string;
  marketcap_usd: string;
  volume_usd: string;
  cex_volume: string;
  xrp_price: string;
  cex_volume_usd: string;
  cex_count: number;
}

export interface GetNftStatisticsRo extends XpmarketResponse {
  data: NftStatisticsItem[];
}

export interface NftStatisticsItem {
  avgBrokerFee: string;
  avgIssuerFee: string;
  avgPrice: string;
  brokerFeeTotal: string;
  burned: number;
  created_at: string;
  date: string;
  exchangesTotal: number;
  issuerFeeTotal: string;
  maxBrokerFee: string;
  maxIssuerFee: string;
  maxPrice: string;
  minted: number;
  nftsTotal: number;
  updated_at: string;
  volume: string;
  xrp_price: string;
}
