import { XummPostPayloadResponse } from 'xumm-sdk/dist/src/types';

import { IndexSignature } from '@xpmarket/xpm.system.types';

import { XpmarketResponse } from '../types';

export type PostLoginRo = XpmarketResponse & XummPostPayloadResponse;

export type GetLoginCheckRouteParams = IndexSignature<{
  id: string;
}>;

export interface GetLoginCheckRo extends XpmarketResponse {
  status: boolean;
  user: User | null;
  access_token: string | null;
  token_type: string;
}

export interface User {
  id: string;
  address: string;
  xumm_token: string;
  parent: number;
  xpcoin: string;
  accounts: SubAccount[];
}

export interface SubAccount {
  address: string;
  id: number;
}
