import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

import { PostLoginRo, User } from '@api/xpmarket/login/types';
import { useAuth } from '@system/auth/AuthContext';
import { useApiMutation } from '@system/fetch/useApiMutation';
import { useXApp } from '@templates/common/layout/page-layout/XAppContext';

import { useLoginStatusChecker } from './useLoginStatusChecker';

interface ReturnType {
  requestTransaction: () => void;
  isLoading: boolean;
  isError: boolean;
  wasSigned: boolean;
  data: PostLoginRo | undefined;
}

export const useLoginPromptRequest = (onSuccess: () => void): ReturnType => {
  const { t } = useTranslation();
  const { onLoginInitiate, onLoginSuccess, onLoginCancel } = useAuth();
  const [wasXappSigned, toggleXappSigned] = useState<boolean>(false);
  const [wasSigned, toggleSigned] = useState<boolean>(false);
  const { mutate, data, reset, isError, isLoading } =
    useApiMutation(onLoginInitiate);
  const handleTransactionSuccess = useCallback(
    (user: User, accessToken: string) => {
      onSuccess();
      onLoginSuccess(user, accessToken, 'None');
      toggleSigned(true);
    },
    [onSuccess, onLoginSuccess]
  );
  const handleTransactionCancel = useCallback(() => {
    reset();
    onLoginCancel();
  }, [reset, onLoginCancel]);
  const uuid = data?.uuid;
  const { xApp } = useXApp();

  useLoginStatusChecker(wasXappSigned, uuid, handleTransactionSuccess);

  useEffect(() => {
    if (uuid) {
      xApp
        ?.openSignRequest({ uuid })
        ?.then((response) => {
          const parsed =
            response instanceof Error ? response.message : response;

          // eslint-disable-next-line no-console
          console.log('XAPP openSignRequest response:', parsed);
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log('XAPP Error:', error.message));

      // Listen for events
      xApp?.on('payload', (response) => {
        if (response.reason === 'DECLINED') {
          handleTransactionCancel();
          toast.error(t<string>('common:walletDialog.declined'));
        }
        if (response.reason === 'SIGNED') {
          toggleXappSigned(true);
        }
      });
    }
  }, [xApp, uuid, handleTransactionCancel, t]);

  return {
    requestTransaction: mutate,
    isLoading,
    isError,
    wasSigned,
    data,
  };
};
