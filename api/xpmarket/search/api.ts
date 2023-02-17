import { client } from '../client';
import { API_URLS } from '../constants';
import { GetSearchRo } from './types';

export const getSearch = async (): Promise<GetSearchRo> => {
  const { data } = await client.get<GetSearchRo>(API_URLS.search.index);

  return data;
};
