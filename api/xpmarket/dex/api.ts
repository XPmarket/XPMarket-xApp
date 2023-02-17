import { withQueryParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetDexBalancesRo,
  GetDexListRo,
  GetDexOpenOrdersRo,
  GetDexPairInfoQueryParams,
  GetDexPairInfoRo,
} from './types';

export const getDexList = async (): Promise<GetDexListRo> => {
  const res = await client.get<GetDexListRo>(API_URLS.dex.list);

  return res.data;
};

export const getDexPairInfo = async (
  queryParams: GetDexPairInfoQueryParams
): Promise<GetDexPairInfoRo> => {
  const pathWithQueryParams = withQueryParams<GetDexPairInfoQueryParams>(
    API_URLS.dex.info,
    queryParams
  );
  const res = await client.get<GetDexPairInfoRo>(pathWithQueryParams);

  return res.data;
};

export const getDexBalances = async (): Promise<GetDexBalancesRo> => {
  const res = await client.get<GetDexBalancesRo>(API_URLS.dex.balances);

  return res.data;
};

export const getDexOpenOrders = async (): Promise<GetDexOpenOrdersRo> => {
  const res = await client.get<GetDexOpenOrdersRo>(API_URLS.dex.openOrders);

  return res.data;
};
