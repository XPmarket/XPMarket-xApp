import { XummPostPayloadResponse } from 'xumm-sdk/dist/src/types';

import { IndexSignature } from '@xpmarket/xpm.system.types';

import { XpmarketResponse } from '../types';

export interface GetTrustlineStatusRo extends XpmarketResponse {
  authorized: boolean;
  limit: number;
}

export interface GetTrustlineSetRo extends XpmarketResponse {
  data: XummPostPayloadResponse;
}

export interface GetTrustlineRemoveRo extends XpmarketResponse {
  data: XummPostPayloadResponse;
}

export interface GetLatestTrustlinesRo extends XpmarketResponse {
  data: LatestTrustline[];
}

export type GetTrustlineStatusRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
}>;

export type GetTrustlineSetRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
}>;

export type GetTrustlineRemoveRouteParams = IndexSignature<{
  code: string;
  issuer: string | undefined;
}>;

export interface LatestTrustline {
  id: number;
  code: string;
  issuer: string;
  trustlines: number;
  hasKyc: boolean;
  hasValidator: boolean;
  hasSellOrders: boolean;
  isBlackholed: boolean;
  isTrusted: boolean;
  isNew: boolean;
  tokenCreated: string;
  limit: string;
  holders: number;
  website?: string;
  twitter?: string;
  title?: string;
  gravatar?: string;
  followers?: number;
  trusted?: boolean;
}
