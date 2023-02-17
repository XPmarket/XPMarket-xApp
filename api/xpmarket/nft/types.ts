import { XummPostPayloadResponse } from 'xumm-sdk/dist/src/types';

import { IndexSignature } from '@xpmarket/xpm.system.types';

import {
  BackendTablePaginationFilters,
  PaginatedData,
  XpmarketResponse,
} from '../types';

export interface PostNftSearchRo extends XpmarketResponse {
  data: NftSearchData;
}

export interface GetNftCurrenciesRo extends XpmarketResponse {
  data: NftCurrency[];
}

export interface NftCurrency {
  currency: string;
  issuer: undefined | null;
  title: string | null;
}

export type NftSearchData = PaginatedData<NftExplorerItem>;

export interface PostNftSearchDto {
  limit: number;
  offset: number;
  priceFrom?: number;
  priceTo?: number;
  currency?: string;
  currencyIssuer?: string | undefined;
  issuer?: string;
  owner?: string;
  onSale?: boolean;
  hasVolume?: boolean;
  hasImage?: boolean;
  keyword?: string;
  sort?: NftSearchCriterion;
}

export type NftSearchCriterion = 'latest' | 'popular' | 'expensive' | 'cheap';

export interface NftExplorerItem {
  id: string;
  name: string;
  collection: string | null;
  collectionId: string | null;
  image: string;
  price: Price;
  salePrice: Price | null;
  likes: number;
  exchanges: number;
}

export interface Price {
  value: number;
  currency: string;
  issuer: string | undefined;
}

export interface GetNftCollectionRo extends XpmarketResponse {
  data: NftCollectionData;
}

export interface NftCollectionData extends PaginatedData<NftCollectionItem> {
  collectionName: string;
  volume: string;
  valuation: string;
  floorPrice: FloorPrice | null;
  txns: number;
  holders: null | number;
  followers: string;
  twitter: string | null;
}

export interface NftCollectionItem {
  bestBid: number | null;
  id: string;
  image: string;
  issuer: string;
  lastAction: string | null;
  price: Price;
  salePrice: Price | null;
  name: string;
  owner: string;
  txns: number;
  volume: number;
}

export type GetNftCollectionRouteParams = IndexSignature<{
  id: string;
}>;

export type PostOfferCreateRouteParams = IndexSignature<{
  id: string;
}>;

export type GetOfferAcceptRouteParams = IndexSignature<{
  id: string;
  type: OfferCreateType;
}>;

export type PostOfferAcceptRouteParams = IndexSignature<{
  id: string;
}>;

export interface PostOfferAcceptDto {
  offerHash: string | undefined;
}

export type PostNftRefreshRouteParams = IndexSignature<{
  id: string;
}>;

export type GetNftRouteParams = IndexSignature<{
  id: string;
}>;

export interface PostOfferCreateDto {
  type: OfferCreateType;
  price: number;
  currency: string;
  offerHash: string | undefined;
  currencyIssuer: string | undefined;
  expiration: string | undefined;
}

export type OfferCreateType = 'sell' | 'buy';

export interface PostOfferCreateRo extends XpmarketResponse {
  data: XummPostPayloadResponse;
}

export interface GetOfferAcceptRo extends XpmarketResponse {
  data: NftAcceptInfo;
}
export interface PostOfferAcceptRo extends XpmarketResponse {
  data: XummPostPayloadResponse;
}

export type PostNftRefreshRo = XpmarketResponse;

export type GetNftCollectionQueryParams =
  IndexSignature<NftCollectionPaginationFilters>;

export type SortableNftCollectionCols = 'lastPrice' | 'tx' | 'salePrice';

export type NftCollectionPaginationFilters =
  BackendTablePaginationFilters<SortableNftCollectionCols>;

export interface NftAcceptInfo {
  amount: Amount;
  expiration: string | null;
  transferFee: string;
  transferFeeAmount: number;
  profit: Amount;
  offerOwner: string;
  offerHash: string;
}

export interface Amount {
  value: number;
  currency: string;
  issuer: string | undefined;
  usd: number;
}

export interface FloorPrice extends Amount {
  cheapestId: string | null;
}

export interface GetNftRo extends XpmarketResponse {
  data: Nft;
}

export type Nft = {
  id: string;
  name: string;
  metadataUrl: string;
  description: string;
  collection: string | null;
  collectionId: string | null;
  flags: NftFlag[];
  issuer: string;
  issuerFee: number;
  exchanges: number;
  owner: string;
  burned: boolean;
  attributes: NftAttribute[];
  others: CollectionItem[];
  bestOffer: NftOffer | null;
  events: NftEvent[];
  priceHistory: NftPriceHistoryPoints[];
  offers?: NftOffer[];
  listings?: NftListing[];
  highestListing?: NftHighestListing;
} & Media;

export type Media =
  | {
      image: string;
      type: 'image';
      video?: undefined;
    }
  | {
      image: string;
      video: string;
      type: 'video';
    };

export type MediaType = 'image' | 'video';

export interface NftAttribute {
  name: string;
  value: string;
  maxValue?: string;
}

export type NftFlag = 'transferable' | 'burnable' | 'onlyXRP';

export interface NftHighestListing {
  amount: Amount;
  total: Amount;
  broker: Broker | null;
  expiration: string | null;
  isAcceptable: boolean;
  offerHash: string;
  offerOwner: string;
  profit: Amount;
  transferFee: string;
  transferFeeAmount: number;
}

export interface NftPriceHistoryPoints {
  x: string;
  y: number;
}

export interface NftEvent {
  event: NftEventType;
  hash: string;
  price: Amount | null;
  date: string;
  from: string;
  to: string;
}

export type NftEventType = 'transfer' | 'mint' | 'burn';

export interface NftOffer {
  amount: Amount;
  expiration: string | null;
  transferFee: string;
  transferFeeAmount: number;
  profit: Amount;
  offerOwner: string;
  offerHash: string;
  isAcceptable: boolean;
  broker: Broker | null;
}

export interface NftListing {
  amount: Amount;
  expiration: string | null;
  transferFee: string;
  transferFeeAmount: number;
  profit: Amount;
  total: Amount;
  offerOwner: string;
  offerHash: string;
  isAcceptable: boolean;
  broker: Broker | null;
}

export interface Broker {
  address: string;
  name: string | null;
}

export interface CollectionItem {
  name: string;
  issuer: string;
  price: Price;
  id: string;
  image: string;
}

export interface GetNftSwipeListRo extends XpmarketResponse {
  data: NftSwipeListItem[];
}

export interface NftSwipeListItem {
  id: string;
  name: string;
  collection: string | null;
  collectionId: string | null;
  exchanges: number;
  price: Price;
  salePrice: Price | null;
  image: string;
}

export type GetNftSwipeListQueryParams = IndexSignature<{ limit: number }>;

export interface GetNftSwipeHistoryRo extends XpmarketResponse {
  data: NftSwipeHistoryItem[];
}

export interface NftSwipeHistoryItem {
  id: string;
  name: string;
  salePrice: Price | null;
  collection: string | null;
  collectionId: string | null;
  exchanges: number;
  price: Price;
  image: string;
}

export type GetNftSwipeHistoryQueryParams = IndexSignature<{ limit: number }>;

export type PostNftSwipeVoteRo = XpmarketResponse;

export type PostNftSwipeVoteRouteParams = IndexSignature<{
  nftId: string;
  decision: 0 | 1;
}>;
