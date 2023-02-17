import { pipe } from 'ramda';

import {
  replaceRouteParams,
  withQueryParams,
} from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetExchangeHistoryQueryParams,
  GetExchangeHistoryRo,
  GetExchangeHistoryRouteParams,
} from './types';

export const getExchangeHistory = async (
  queryParams: GetExchangeHistoryQueryParams,
  routeParams: GetExchangeHistoryRouteParams
): Promise<GetExchangeHistoryRo> => {
  const path = pipe(
    (path) => replaceRouteParams(path, routeParams),
    (path) => withQueryParams(path, queryParams)
  )(API_URLS.exchanges.symbol);
  const res = await client.get<GetExchangeHistoryRo>(path);

  return res.data;
};
