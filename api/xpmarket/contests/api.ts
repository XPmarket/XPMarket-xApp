import { client } from '../client';
import { API_URLS } from '../constants';
import { GetDexLadderRo } from './types';

export const getDexLadder = async (): Promise<GetDexLadderRo> => {
  const { data } = await client.get<GetDexLadderRo>(API_URLS.constests.dex);

  return data;
};
