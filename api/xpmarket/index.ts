import * as accounts from './accounts/api';
import * as admin from './admin/api';
import * as contests from './contests/api';
import * as currency from './currency/api';
import * as dex from './dex/api';
import * as fx from './fx/api';
import * as login from './login/api';
import * as nft from './nft/api';
import * as portfolio from './portfolio/api';
import * as rating from './rating/api';
import * as search from './search/api';
import * as stats from './stats/api';
import * as swap from './swap/api';
import * as trustline from './trustline/api';

export const xpmarket = {
  dex,
  trustline,
  stats,
  rating,
  login,
  accounts,
  currency,
  portfolio,
  swap,
  admin,
  fx,
  nft,
  search,
  contests,
};
