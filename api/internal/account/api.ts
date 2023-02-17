import { replaceRouteParams } from '@xpmarket/xpm.system.routes';

import { client } from '../client';
import { API_URLS } from '../constants';
import {
  GetXummPayload,
  GetXummPayloadRouteParams,
  PostXummPayloadDto,
  PostXummPayloadRo,
} from './types';

export const postXummPayload = async (
  dto: PostXummPayloadDto
): Promise<PostXummPayloadRo> => {
  const res = await client.post<PostXummPayloadRo>(
    API_URLS.account.wallet,
    dto
  );

  return res.data;
};

export const getXummPayload = async (
  routeParams: GetXummPayloadRouteParams
): Promise<GetXummPayload> => {
  const res = await client.get<GetXummPayload>(
    replaceRouteParams(API_URLS.account.resolveWallet, routeParams)
  );

  return res.data;
};
