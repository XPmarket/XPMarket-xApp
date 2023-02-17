import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetMainStatsRo,
  GetNftStatisticsRo,
  GetTokenStatisticsRo,
} from './types';

export const getMainStats = async (): Promise<GetMainStatsRo> => {
  const res = await client.get<GetMainStatsRo>(API_URLS.stats.main);

  return res.data;
};

export const getTokenStatistics = async (): Promise<GetTokenStatisticsRo> => {
  const { data } = await client.get<GetTokenStatisticsRo>(
    API_URLS.stats.tokens
  );

  return data;
};

export const getNftStatistics = async (): Promise<GetNftStatisticsRo> => {
  const { data } = await client.get<GetNftStatisticsRo>(API_URLS.stats.nfts);

  return data;
};
