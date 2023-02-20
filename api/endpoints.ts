import { makeXpmRequests } from '@xpmarket/xpm.api.xpmarket';
import { makeXpmInternalRequests } from '@xpmarket/xpm.api.xpmarket-internal';

import { xpmClient } from './xpmarket/client';
import { xpmInternalClient } from './xpmarket-internal/client';

export const api = {
  xpmarket: makeXpmRequests(xpmClient),
  xpmarketInternal: makeXpmInternalRequests(xpmInternalClient),
};
