import { makeClient } from '@api/common/setup';
import { API_BASE, API_BASE_PREFIX } from '@xpmarket/xpm.api.xpmarket';

export const xpmClient = makeClient({
  baseURL: `${API_BASE}${API_BASE_PREFIX}`,
});
