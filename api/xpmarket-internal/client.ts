import { makeClient } from '@api/common/setup';
import { API_BASE, API_BASE_PREFIX } from '@xpmarket/xpm.api.xpmarket-internal';

export const xpmInternalClient = makeClient({
  baseURL: `${API_BASE}${API_BASE_PREFIX}`,
});
