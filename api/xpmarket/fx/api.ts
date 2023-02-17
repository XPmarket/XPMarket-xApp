import { client } from '../client';
import { API_URLS } from '../constants';
import { GetFxRo, GetFxTopRo } from './types';

export const getFxTop = async (): Promise<GetFxTopRo> => {
  const { data } = await client.get<GetFxTopRo>(API_URLS.fx.top);

  return data;
};

export const getFx = async (): Promise<GetFxRo> => {
  const { data } = await client.get<GetFxRo>(API_URLS.fx.index);

  return data;
};
