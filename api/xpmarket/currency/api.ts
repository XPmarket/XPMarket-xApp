import { replaceRouteParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetAdvancedInfoRo,
  GetAdvancedInfoRouteParams,
  GetBasicInfoRo,
  GetBasicInfoRouteParams,
  GetPricesRo,
  GetPricesRouteParams,
  GetRankRo,
  GetRankRouteParams,
  GetVolumesRo,
  GetVolumesRouteParams,
} from './types';

export const getAdvancedInfo = async (
  routeParams: GetAdvancedInfoRouteParams
): Promise<GetAdvancedInfoRo> => {
  const res = await client.get<GetAdvancedInfoRo>(
    replaceRouteParams(API_URLS.currency.index, routeParams)
  );

  return res.data;
};

export const getBasicInfo = async (
  routeParams: GetBasicInfoRouteParams
): Promise<GetBasicInfoRo> => {
  const res = await client.get<GetBasicInfoRo>(
    replaceRouteParams(API_URLS.currency.basic, routeParams)
  );

  return res.data;
};

export const getPrices = async (
  routeParams: GetPricesRouteParams
): Promise<GetPricesRo> => {
  const res = await client.get<GetPricesRo>(
    replaceRouteParams(API_URLS.currency.prices, routeParams)
  );

  return res.data;
};

export const getVolumes = async (
  routeParams: GetVolumesRouteParams
): Promise<GetVolumesRo> => {
  const res = await client.get<GetVolumesRo>(
    replaceRouteParams(API_URLS.currency.volumes, routeParams)
  );

  return res.data;
};

export const getRank = async (
  routeParams: GetRankRouteParams
): Promise<GetRankRo> => {
  const res = await client.get<GetRankRo>(
    replaceRouteParams(API_URLS.currency.rank, routeParams)
  );

  return res.data;
};
