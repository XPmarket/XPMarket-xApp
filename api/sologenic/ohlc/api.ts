import { withQueryParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import { GetOhlcQueryParams, GetOhlcRo } from './types';

export const getOhlc = async (
  queryParams: GetOhlcQueryParams
): Promise<GetOhlcRo> => {
  const res = await client.get<GetOhlcRo>(
    withQueryParams(API_URLS.ohlc.index, queryParams)
  );

  return res.data;
};
