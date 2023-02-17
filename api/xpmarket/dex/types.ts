import { IndexSignature } from '@xpmarket/xpm.system.types';
import { TakerAmount } from '@xpmarket/xpm.system.xrpl';

import { XpmarketResponse } from '../types';

export interface GetDexListRo extends XpmarketResponse {
  featured: ListPair[];
  top10: ListPair[];
}

export interface GetDexBalancesRo extends XpmarketResponse {
  accountObjects: AccountObject[];
  accountInfo: AccountInfo;
}

export interface GetDexOpenOrdersRo extends XpmarketResponse {
  data: AccountOffer[];
}

export interface AccountOffer {
  flags: number;
  quality: string;
  seq: number;
  taker_gets: string;
  taker_pays: TakerAmount;
}

export interface ListPair {
  base: string;
  counter: string;
  base_issuer: string;
  counter_issuer: string;
  symbol: string;
  change: number;
  logo: string;
  max: string;
  min: string;
  price: string;
  priceBefore: string;
  sparkline: number[];
  volume: string;
}

export interface GetDexPairInfoRo extends XpmarketResponse {
  info: ListPair;
}

export type GetDexPairInfoQueryParams = IndexSignature<{
  symbol: string;
}>;

export interface AccountObject {
  account: string;
  balance: string;
  currency: string;
  limit: string;
  limit_peer: string;
  no_ripple: boolean;
  no_ripple_peer: boolean;
  quality_in: number;
  quality_out: number;
}

export interface AccountInfo {
  Account: string;
  Balance: string;
  Flags: number;
  LedgerEntryType: string;
  OwnerCount: number;
  PreviousTxnID: string;
  PreviousTxnLgrSeq: number;
  Sequence: number;
  index: string;
}
