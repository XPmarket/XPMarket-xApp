import { replaceRouteParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import { GetAutoLoginRo, GetAutoLoginRouteParams } from './types';

export const getAutoLogin = async (
  routeParams: GetAutoLoginRouteParams
): Promise<GetAutoLoginRo> => {
  const path = replaceRouteParams(API_URLS.admin.autoLogin, routeParams);
  const res = await client.get<GetAutoLoginRo>(path);

  return res.data;
};
