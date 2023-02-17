import { replaceRouteParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetAllTokensRo,
  GetExchangesRo,
  GetNftCollectionsTopRo,
  GetNftCollectionsTopRouteParams,
  GetNftsHeatmapRo,
  GetNftsHeatmapRouteParams,
  GetRichestXrplCommunityRo,
  GetSummaryRo,
  GetTokensHeatmapRo,
  GetTokensHeatmapRouteParams,
  GetTop100Ro,
  GetTopHeaderRo,
} from './types';

export const getSummary = async (): Promise<GetSummaryRo> => {
  const res = await client.get<GetSummaryRo>(API_URLS.rating.summary);

  return res.data;
};

export const getTopHeader = async (): Promise<GetTopHeaderRo> => {
  const res = await client.get<GetTopHeaderRo>(API_URLS.rating.top.header);

  return res.data;
};

export const getTop100 = async (): Promise<GetTop100Ro> => {
  const res = await client.get<GetTop100Ro>(API_URLS.rating.top.index);

  return res.data;
};

export const getAllTokens = async (): Promise<GetAllTokensRo> => {
  const res = await client.get<GetAllTokensRo>(API_URLS.rating.all);

  return res.data;
};

export const getTokensHeatmap = async (
  routeParams: GetTokensHeatmapRouteParams
): Promise<GetTokensHeatmapRo> => {
  const path = replaceRouteParams(API_URLS.rating.tokensHeatmap, routeParams);
  const res = await client.get<GetTokensHeatmapRo>(path);

  return res.data;
};

export const getNftsHeatmap = async (
  routeParams: GetNftsHeatmapRouteParams
): Promise<GetNftsHeatmapRo> => {
  const path = replaceRouteParams(API_URLS.rating.nftsHeatmap, routeParams);
  const res = await client.get<GetNftsHeatmapRo>(path);

  return res.data;
};

export const getExchanges = async (): Promise<GetExchangesRo> => {
  const res = await client.get<GetExchangesRo>(API_URLS.rating.exchanges);

  return res.data;
};

export const getRichestXrplCommunity =
  async (): Promise<GetRichestXrplCommunityRo> => {
    const res = await client.get<GetRichestXrplCommunityRo>(
      API_URLS.rating.richestCommunity
    );

    return res.data;
  };

export const getNftCollectionsTop = async (
  routeParams: GetNftCollectionsTopRouteParams
): Promise<GetNftCollectionsTopRo> => {
  const path = replaceRouteParams(API_URLS.rating.nftCollections, routeParams);
  const res = await client.get<GetNftCollectionsTopRo>(path);

  return res.data;
};
