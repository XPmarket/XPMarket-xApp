import {
  CreatedPayload,
  CreatePayload,
  XummGetPayloadResponse,
} from 'xumm-sdk/dist/src/types';

import { IndexSignature } from '@xpmarket/xpm.system.types';

export type PostXummPayloadRo = CreatedPayload;

export type PostXummPayloadDto = CreatePayload;

export type GetXummPayload = XummGetPayloadResponse;

export type GetXummPayloadRouteParams = IndexSignature<{
  id: string;
}>;
