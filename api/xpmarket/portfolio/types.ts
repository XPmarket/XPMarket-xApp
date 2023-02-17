import { PostXummPayloadRo } from '@api/internal/account/types';
import { IndexSignature } from '@xpmarket/xpm.system.types';

import { Broker, Price } from '../nft/types';
import { XpmarketPaginatedResponse, XpmarketResponse } from '../types';

export interface GetPortfolioAssetsRo extends XpmarketResponse {
  data: PortfolioAssetsToken[];
  counts: PortfolioAssetsCount;
}

export interface GetTokenOrdersRo extends XpmarketResponse {
  data: TokenOrder[];
}

export interface GetNftOrdersRo extends XpmarketResponse {
  data: NftOrder[];
}

export type GetPortfolioNftsRo = XpmarketPaginatedResponse<PortfolioNft>;

export interface PortfolioNftsPaginationFilters {
  marker: string | undefined;
  offset: number;
  limit: number;
}

export interface PortfolioNftsData {
  items: PortfolioNft[];
}

export type GetPortfolioNftsQueryParams = IndexSignature<{
  marker: string | undefined;
  limit: number;
}>;

export interface GetProfitAndLossRo extends XpmarketResponse {
  data: ProfitAndLoss;
}

export interface PortfolioNft {
  image: string;
  name: string | null | undefined;
  description: string | null | undefined;
  collection: string | null | undefined;
  collectionId: string | null | undefined;
  issuer: string;
  id: string;
  taxon: number;
  fee: string;
  flags: string[];
  sellOffers: number;
  buyOffers: number;
  profit: NftCurrency;
  lastPrice: NftCurrency;
  from: string;
}

export interface NftCurrency {
  currency: string;
  issuer: string | null | undefined;
  value: number;
}

export interface TokenOrder {
  flag: 'Offer' | 'Unknown';
  base: string;
  base_issuer: string | undefined;
  counter: string;
  counter_issuer: string | undefined;
  type: TokenOrderType;
  base_value: number;
  counter_value: number;
  base_logo: string;
  counter_logo: string;
  users_daily: number;
  exchanges_daily: number;
  sequence: number;
  price: number;
}

export interface NftOrder {
  price: Price;
  type: NftOrderType;
  broker: Broker | null;
  offerId: string;
  nft: NftOrderNft;
  expiration: string | null;
}

export interface NftOrderNft {
  id: string;
  name: string;
  description: string | null;
  image: string;
  collection: string | null;
  collectionId: string | null;
  from: string;
  lastPrice: Price;
}

export type TokenOrderType = 'buy' | 'sell';

export type NftOrderType = 'buy' | 'sell';

export interface PortfolioAssetsCount {
  trustlines: number;
  usd: number;
  xrp: number;
  dead: number;
  scam: number;
  untrusted: number;
}

export interface PortfolioAssetsToken {
  issuer: string;
  balance: string;
  currency: string;
  id: number;
  code: string;
  title: string;
  gravatar: string;
  twitter: string;
  trustlines: number;
  followers: number;
  hasKyc: boolean;
  hasValidator: boolean;
  hasSellOrders: boolean;
  isBlackholed: boolean;
  isNew: boolean;
  isDead: boolean;
  isScam: boolean;
  hasTrustline: boolean;
  activeUsersDaily: number;
  exchangesDaily: number;
  holders: number;
  priceChange: number;
  value_xrp: number;
  value_usd: number;
  website?: string;
}

export interface ProfitAndLoss {
  currencies: Record<string, CurrencyTx[]>;
  profits: Record<string, CurrencyProfit>;
  totalTx: number;
  biggestProfit: string;
  biggestLost: string;
  totalProfit: number;
  leader: string;
  loser: string;
  leaderGravatar: string;
  loserGravatar: string;
  leaders: ProfitChartPoint[];
  losers: ProfitChartPoint[];
}

export interface ProfitChartPoint {
  x: string;
  y: number;
  color: string;
}

interface CurrencyProfit {
  buy: string;
  sell: string;
  profit: string;
}

export interface CurrencyTx {
  action: CurrencyTxAction;
  counter_amount: string;
  amount: string;
  date: string;
  currency: string;
  counter_currency: string;
}

export type CurrencyTxAction = 'received' | 'buy' | 'sell' | 'balance' | 'sent';

export type PostNftOrderCancelRouteParams = IndexSignature<{
  offerId: string;
}>;

export interface PostNftOrderCancelRo extends XpmarketResponse {
  data: PostXummPayloadRo;
}
