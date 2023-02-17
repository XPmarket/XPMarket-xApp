import { client } from '../client';
import { API_URLS } from '../constants';
import { GetHealthRo } from './types';

export const getHealth = async (): Promise<GetHealthRo> => {
  const res = await client.get<GetHealthRo>(API_URLS.health.index);

  return res.data;
};
