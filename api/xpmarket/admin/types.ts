import { IndexSignature } from '@xpmarket/xpm.system.types';

import { User } from '../login/types';
import { XpmarketResponse } from '../types';

export interface GetAutoLoginRo extends XpmarketResponse {
  status: boolean;
  user: User;
  access_token: string;
  token_type: string;
}

export type GetAutoLoginRouteParams = IndexSignature<{
  walletAddress: string;
}>;
