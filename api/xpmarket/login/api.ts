import { replaceRouteParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetLoginCheckRo,
  GetLoginCheckRouteParams,
  PostLoginRo,
} from './types';

export const postLogin = async (): Promise<PostLoginRo> => {
  const res = await client.post<PostLoginRo>(API_URLS.login.index);

  return res.data;
};

export const getLoginCheck = async (
  routeParams: GetLoginCheckRouteParams
): Promise<GetLoginCheckRo> => {
  const res = await client.get<GetLoginCheckRo>(
    replaceRouteParams(API_URLS.login.check, routeParams)
  );

  return res.data;
};
