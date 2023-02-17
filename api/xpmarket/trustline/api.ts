import { replaceRouteParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetLatestTrustlinesRo,
  GetTrustlineRemoveRo,
  GetTrustlineRemoveRouteParams,
  GetTrustlineSetRo,
  GetTrustlineSetRouteParams,
  GetTrustlineStatusRo,
  GetTrustlineStatusRouteParams,
} from './types';

export const getTrustlineStatus = async (
  routeParams: GetTrustlineStatusRouteParams
): Promise<GetTrustlineStatusRo> => {
  const withRouteParams = replaceRouteParams(
    API_URLS.trustline.check,
    routeParams
  );

  const res = await client.get<GetTrustlineStatusRo>(withRouteParams);

  return res.data;
};

export const getTrustlineSet = async (
  routeParams: GetTrustlineSetRouteParams
): Promise<GetTrustlineSetRo> => {
  const withRouteParams = replaceRouteParams(
    API_URLS.trustline.set,
    routeParams
  );

  const res = await client.get<GetTrustlineSetRo>(withRouteParams);

  return res.data;
};

export const getTrustlineRemove = async (
  routeParams: GetTrustlineRemoveRouteParams
): Promise<GetTrustlineRemoveRo> => {
  const withRouteParams = replaceRouteParams(
    API_URLS.trustline.remove,
    routeParams
  );

  const res = await client.get<GetTrustlineRemoveRo>(withRouteParams);

  return res.data;
};

export const getLatestTrustlines = async (): Promise<GetLatestTrustlinesRo> => {
  const res = await client.get<GetLatestTrustlinesRo>(
    API_URLS.trustline.latest
  );

  return res.data;
};
