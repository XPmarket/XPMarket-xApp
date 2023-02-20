import { makeXpmRequests } from '@xpmarket/xpm.api.xpmarket';

import { xpmClient } from './client';

export const XPMARKET_API = makeXpmRequests(xpmClient);
