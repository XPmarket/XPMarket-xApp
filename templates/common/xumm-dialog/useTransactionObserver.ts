import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useWebSocket from 'react-use-websocket';
import { useTranslation } from 'next-i18next';
import { XummPostPayloadResponse } from 'xumm-sdk/dist/src/types';

import { TOAST_IDS } from '@system/constants';
import { useTabVisibility } from '@xpmarket/xpm.system.use-tab-visibility';

import { checkExpiration, checkSigned } from './helpers';
import { useXummPayloadChecker } from './useXummPayloadChecker';

interface ReturnType {
  wasSigned: boolean;
  wasRejected: boolean;
  hasExpired: boolean;
}

export const useTransactionObserver = (
  payloadResponse: XummPostPayloadResponse | undefined,
  onSuccess: ((id: string) => void) | undefined,
  onCancel: (() => void) | undefined
): ReturnType => {
  const { t } = useTranslation();
  const [wasSigned, toggleSigned] = useState<boolean>(false);
  const [wasRejected, toggleRejected] = useState<boolean>(false);
  const [hasExpired, toggleExpiration] = useState<boolean>(false);
  const { isTabVisible } = useTabVisibility();
  const canConnect = !!payloadResponse?.refs.websocket_status;
  const { lastJsonMessage } = useWebSocket(
    payloadResponse?.refs.websocket_status ?? null,
    {},
    canConnect && isTabVisible
  );
  const uuid = payloadResponse?.uuid;
  const { data } = useXummPayloadChecker(payloadResponse, wasSigned);

  useEffect(() => {
    if (
      uuid !== undefined &&
      (data?.meta.resolved || (lastJsonMessage && 'signed' in lastJsonMessage))
    ) {
      const isExpired = checkExpiration(lastJsonMessage);
      const isSigned = checkSigned(lastJsonMessage);

      if (isSigned || (data?.meta.signed && data?.meta.resolved)) {
        onSuccess?.(uuid);
        toggleSigned(true);
      }
      if (
        (!isSigned && isSigned !== null) ||
        (!data?.meta.signed && data?.meta.resolved)
      ) {
        onCancel?.();
        toggleRejected(true);
        toast.error(t<string>('common:walletDialog.declined'), {
          toastId: TOAST_IDS.txDeclinded,
        });
      }
      if (isExpired || data?.meta.expired) {
        toggleExpiration(true);
      }
    }
  }, [
    uuid,
    onSuccess,
    lastJsonMessage,
    onCancel,
    t,
    data?.meta.signed,
    data?.meta.resolved,
    data?.meta.expired,
  ]);

  return {
    wasSigned,
    wasRejected,
    hasExpired,
  };
};
