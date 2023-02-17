import {
  replaceRouteParams,
  withQueryParams,
} from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetNftOrdersRo,
  GetPortfolioAssetsRo,
  GetPortfolioNftsQueryParams,
  GetPortfolioNftsRo,
  GetProfitAndLossRo,
  GetTokenOrdersRo,
  PostNftOrderCancelRo,
  PostNftOrderCancelRouteParams,
} from './types';

export const getPortfolioAssets = async (): Promise<GetPortfolioAssetsRo> => {
  const res = await client.get<GetPortfolioAssetsRo>(API_URLS.portfolio.index);

  return res.data;
};

export const getTokenOrders = async (): Promise<GetTokenOrdersRo> => {
  const res = await client.get<GetTokenOrdersRo>(
    API_URLS.portfolio.tokenOrders
  );

  return res.data;
};

export const postNftOrderCancel = async (
  routeParams: PostNftOrderCancelRouteParams
): Promise<PostNftOrderCancelRo> => {
  const path = replaceRouteParams(
    API_URLS.portfolio.nftOrderCancel,
    routeParams
  );
  const res = await client.post<PostNftOrderCancelRo>(path);

  return res.data;
};

export const getNftOrders = async (): Promise<GetNftOrdersRo> => {
  const res = await client.get<GetNftOrdersRo>(API_URLS.portfolio.nftOrders);

  return res.data;
};

export const getPortfolioNfts = async (
  queryParams: GetPortfolioNftsQueryParams
): Promise<GetPortfolioNftsRo> => {
  const path = withQueryParams(API_URLS.portfolio.nfts, queryParams);
  const res = await client.get<GetPortfolioNftsRo>(path);

  return res.data;
};

export const getProfitAndLoss = async (): Promise<GetProfitAndLossRo> => {
  const res = await client.get<GetProfitAndLossRo>(
    API_URLS.portfolio.profitAndLoss
  );

  return res.data;
};
