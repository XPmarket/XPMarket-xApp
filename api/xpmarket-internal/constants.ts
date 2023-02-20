import { makeXpmInternalRequests } from '@xpmarket/xpm.api.xpmarket-internal';

import { xpmInternalClient } from './client';

export const XPMARKET_INTERNAL_API = makeXpmInternalRequests(xpmInternalClient);
