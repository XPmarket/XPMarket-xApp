import { pipe } from 'ramda';

import {
  replaceRouteParams,
  withQueryParams,
} from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetNftCollectionQueryParams,
  GetNftCollectionRo,
  GetNftCollectionRouteParams,
  GetNftCurrenciesRo,
  GetNftRo,
  GetNftRouteParams,
  GetNftSwipeHistoryQueryParams,
  GetNftSwipeHistoryRo,
  GetNftSwipeListQueryParams,
  GetNftSwipeListRo,
  GetOfferAcceptRo,
  GetOfferAcceptRouteParams,
  PostNftRefreshRo,
  PostNftRefreshRouteParams,
  PostNftSearchDto,
  PostNftSearchRo,
  PostNftSwipeVoteRo,
  PostNftSwipeVoteRouteParams,
  PostOfferAcceptDto,
  PostOfferAcceptRo,
  PostOfferAcceptRouteParams,
  PostOfferCreateDto,
  PostOfferCreateRo,
  PostOfferCreateRouteParams,
} from './types';

export const getNftCollection = async (
  routeParams: GetNftCollectionRouteParams,
  queryParams: GetNftCollectionQueryParams
): Promise<GetNftCollectionRo> => {
  const path = pipe(
    (path) => replaceRouteParams(path, routeParams),
    (path) => withQueryParams(path, queryParams)
  )(API_URLS.nft.collection);
  const res = await client.get<GetNftCollectionRo>(path);

  return res.data;
};

export const postOfferCreate = async (
  dto: PostOfferCreateDto,
  routeParams: PostOfferCreateRouteParams
): Promise<PostOfferCreateRo> => {
  const path = replaceRouteParams(API_URLS.nft.createOffer, routeParams);
  const res = await client.post<PostOfferCreateRo>(path, dto);

  return res.data;
};

export const getOfferAccept = async (
  routeParams: GetOfferAcceptRouteParams
): Promise<GetOfferAcceptRo> => {
  const path = replaceRouteParams(API_URLS.nft.acceptOfferType, routeParams);
  const res = await client.get<GetOfferAcceptRo>(path);

  return res.data;
};

export const postOfferAccept = async (
  dto: PostOfferAcceptDto,
  routeParams: PostOfferAcceptRouteParams
): Promise<PostOfferAcceptRo> => {
  const path = replaceRouteParams(API_URLS.nft.acceptOffer, routeParams);
  const res = await client.post<PostOfferAcceptRo>(path, dto);

  return res.data;
};

export const getNft = async (
  routeParams: GetNftRouteParams
): Promise<GetNftRo> => {
  const path = replaceRouteParams(API_URLS.nft.overview, routeParams);
  const res = await client.get<GetNftRo>(path);

  return res.data;
};

export const getNftCurrencies = async (): Promise<GetNftCurrenciesRo> => {
  const res = await client.get<GetNftCurrenciesRo>(API_URLS.nft.currencies);

  return res.data;
};

export const postNftSearch = async (
  dto: PostNftSearchDto
): Promise<PostNftSearchRo> => {
  const res = await client.post<PostNftSearchRo>(API_URLS.nft.search, dto);

  return res.data;
};

export const postNftRefresh = async (
  routeParams: PostNftRefreshRouteParams
): Promise<PostNftRefreshRo> => {
  const path = replaceRouteParams(API_URLS.nft.refresh, routeParams);
  const res = await client.post<PostNftRefreshRo>(path);

  return res.data;
};

export const getNftSwipeList = async (
  queryParams: GetNftSwipeListQueryParams
): Promise<GetNftSwipeListRo> => {
  const path = withQueryParams(API_URLS.nft.swipeList, queryParams);
  const res = await client.get<GetNftSwipeListRo>(path);

  return res.data;
};

export const getNftSwipeHistory = async (
  queryParams: GetNftSwipeHistoryQueryParams
): Promise<GetNftSwipeHistoryRo> => {
  const path = withQueryParams(API_URLS.nft.swipeHistory, queryParams);
  const res = await client.get<GetNftSwipeHistoryRo>(path);

  return res.data;
};

export const postNftSwipeVote = async (
  routeParams: PostNftSwipeVoteRouteParams
): Promise<PostNftSwipeVoteRo> => {
  const path = replaceRouteParams(API_URLS.nft.swipeVote, routeParams);
  const res = await client.post<PostNftSwipeVoteRo>(path);

  return res.data;
};
