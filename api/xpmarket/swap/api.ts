import { withQueryParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetSwapListQueryParams,
  GetSwapListRo,
  PostSwapImpactQueryParams,
  PostSwapImpactRo,
  PostSwapQueryParams,
  PostSwapRateQueryParams,
  PostSwapRateRo,
  PostSwapRo,
} from './types';

export const getSwapList = async (
  queryParams: GetSwapListQueryParams
): Promise<GetSwapListRo> => {
  const path = withQueryParams(API_URLS.swap.list, queryParams);
  const res = await client.get<GetSwapListRo>(path);

  return res.data;
};

export const postSwapImpact = async (
  queryParams: PostSwapImpactQueryParams
): Promise<PostSwapImpactRo> => {
  const path = withQueryParams(API_URLS.swap.impact, queryParams);
  const res = await client.post<PostSwapImpactRo>(path);

  return res.data;
};

export const postSwapRate = async (
  queryParams: PostSwapRateQueryParams
): Promise<PostSwapRateRo> => {
  const path = withQueryParams(API_URLS.swap.rate, queryParams);
  const res = await client.post<PostSwapRateRo>(path);

  return res.data;
};

export const postSwap = async (
  queryParams: PostSwapQueryParams
): Promise<PostSwapRo> => {
  const path = withQueryParams(API_URLS.swap.index, queryParams);
  const res = await client.post<PostSwapRo>(path);

  return res.data;
};
