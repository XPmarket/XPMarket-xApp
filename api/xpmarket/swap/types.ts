import { XummPostPayloadResponse } from 'xumm-sdk/dist/src/types';

import { IndexSignature } from '@xpmarket/xpm.system.types';

import { XpmarketResponse } from '../types';

export type GetSwapListRo = SwapToken[];

export interface SwapToken {
  id: number;
  code: string;
  price: number | null;
  title: string | null;
  issuer: string | undefined;
  trusted?: boolean;
}

export interface PostSwapRateRo extends XpmarketResponse {
  rate: number;
}

export interface PostSwapImpactRo extends XpmarketResponse {
  impact: number;
}

export interface PostSwapRo extends XpmarketResponse {
  data: XummPostPayloadResponse;
}

export type PostSwapRateQueryParams = IndexSignature<{
  code1: string;
  issuer1?: string;
  code2: string;
  issuer2?: string;
  amount: number;
}>;

export type PostSwapImpactQueryParams = IndexSignature<{
  code1: string;
  issuer1?: string;
  code2: string;
  issuer2?: string;
  amount: number;
}>;

export type PostSwapQueryParams = IndexSignature<{
  code1: string;
  issuer1?: string;
  code2: string;
  issuer2?: string;
  amount: number;
}>;

export type GetSwapListQueryParams = IndexSignature<{
  base?: string;
  counter?: string;
}>;
