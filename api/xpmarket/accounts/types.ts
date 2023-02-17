import { IndexSignature } from '@xpmarket/xpm.system.types';

import { SubAccount, User } from '../login/types';
import { XpmarketResponse } from '../types';

export interface PostSwitchAccountRo extends XpmarketResponse {
  status: boolean;
  user: User;
  access_token: string;
  token_type: string;
}

export type DeleteAccountRo = XpmarketResponse;

export interface GetAccountsRo extends XpmarketResponse {
  accounts: SubAccount[];
}

export type PostSwitchAccountRouteParams = IndexSignature<{
  address: string;
}>;

export type DeleteAccountRouteParams = IndexSignature<{
  address: string;
}>;
