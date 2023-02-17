import { replaceRouteParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  DeleteAccountRo,
  DeleteAccountRouteParams,
  GetAccountsRo,
  PostSwitchAccountRo,
  PostSwitchAccountRouteParams,
} from './types';

export const postSwitchAccount = async (
  routeParams: PostSwitchAccountRouteParams
): Promise<PostSwitchAccountRo> => {
  const res = await client.post<PostSwitchAccountRo>(
    replaceRouteParams(API_URLS.accounts.switch, routeParams)
  );

  return res.data;
};

export const deleteAccount = async (
  routeParams: DeleteAccountRouteParams
): Promise<DeleteAccountRo> => {
  const res = await client.delete<DeleteAccountRo>(
    replaceRouteParams(API_URLS.accounts.remove, routeParams)
  );

  return res.data;
};

export const getAccounts = async (): Promise<GetAccountsRo> => {
  const res = await client.get<GetAccountsRo>(API_URLS.accounts.index);

  return res.data;
};
