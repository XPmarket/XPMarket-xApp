import {
  XummGetPayloadResponse,
  XummPostPayloadResponse,
} from 'xumm-sdk/dist/src/types';

import { api } from '@api/endpoints';
import { CACHE_KEYS, FETCH_INTERVAL } from '@system/fetch/constants';
import { formatError } from '@system/fetch/errors';
import { useApiQuery } from '@system/fetch/useApiQuery';

interface ReturnType {
  data: XummGetPayloadResponse | undefined;
}

export const useXummPayloadChecker = (
  payloadResponse: XummPostPayloadResponse | undefined,
  wasSigned: boolean
): ReturnType => {
  const canConnect = !!payloadResponse?.refs.websocket_status;
  const uuid = payloadResponse?.uuid;
  const { data } = useApiQuery(
    CACHE_KEYS.transactionObserve(uuid),
    (context) => requestCheck(context.queryKey[1]),
    {
      refetchInterval: FETCH_INTERVAL.transactionObserve,
      enabled: canConnect && !wasSigned && !!uuid,
      refetchOnWindowFocus: true,
    }
  );

  return {
    data,
  };
};

const requestCheck = async (
  uuid: string | null
): Promise<XummGetPayloadResponse> => {
  if (!uuid) {
    throw new Error('uuid - undefined');
  }

  try {
    const res = await api.internal.account.getXummPayload({
      id: uuid,
    });

    return res;
  } catch (error) {
    throw formatError({ error, showToast: false });
  }
};
