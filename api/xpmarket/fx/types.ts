import { XpmarketResponse } from '../types';

export interface GetFxTopRo extends XpmarketResponse {
  data: FxTopItem[];
}

export interface GetFxRo extends XpmarketResponse {
  data: FxData;
}

interface FxData {
  data: Record<string, FxItem>;
  headlines: Record<string, string>;
}

export type FxItem = Record<string, FxPair>;

export interface FxPair {
  base: string | null;
  base_issuer: string | null;
  counter: string | null;
  counter_issuer: string | null;
  price: string;
  volume: string;
  change: number;
}

export interface FxTopItem {
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

export interface Ranking {
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
