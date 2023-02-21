import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

import { useAuth } from '@system/auth/AuthContext';
import { useApiMutation } from '@system/fetch/useApiMutation';
import { useXApp } from '@templates/common/layout/page-layout/XAppContext';
import { PostLoginRo, User } from '@xpmarket/xpm.api.xpmarket';

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
  const [wasXAppSigned, toggleXAppSigned] = useState<boolean>(false);
  const [wasSigned, toggleSigned] = useState<boolean>(false);
  const { mutate, data, reset, isError, isLoading } =
    useApiMutation(onLoginInitiate);
  const handleTransactionSuccess = useCallback(
    (user: User, accessToken: string) => {
      // eslint-disable-next-line no-console
      console.log('SIGNED', user, accessToken);
      onLoginSuccess(user, accessToken);
      toggleSigned(true);
      onSuccess();
    },
    [onSuccess, onLoginSuccess]
  );
  const handleTransactionCancel = useCallback(() => {
    reset();
    onLoginCancel();
  }, [reset, onLoginCancel]);
  const uuid = data?.uuid;
  const { xApp } = useXApp();

  useLoginStatusChecker(wasXAppSigned, uuid, handleTransactionSuccess);

  useEffect(() => {
    if (uuid) {
      xApp?.openSignRequest({ uuid });

      // Listen for events
      xApp?.on('payload', (response) => {
        if (response.reason === 'DECLINED') {
          handleTransactionCancel();
          toast.error(t<string>('common:walletDialog.declined'));
        }
        if (response.reason === 'SIGNED') {
          toggleXAppSigned(true);
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
