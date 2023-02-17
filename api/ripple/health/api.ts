import { client } from '../client';
import { API_URLS } from '../constants';

export const getHealth = async (): Promise<number> => {
  const res = await client.get<number>(API_URLS.health);

  return res.data;
};
