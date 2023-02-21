import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

import { useAuth } from '@system/auth/AuthContext';
import { TOAST_IDS } from '@system/constants';
import { useApiMutation } from '@system/fetch/useApiMutation';
import { useXApp } from '@templates/common/layout/page-layout/XAppContext';
import { PostLoginRo, User } from '@xpmarket/xpm.api.xpmarket';

import { useLoginStatusChecker } from './useLoginStatusChecker';

interface ReturnType {
  requestLogin: () => void;
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
  const { mutate, data, reset, isError, isLoading } = useApiMutation(
    onLoginInitiate,
    {
      onSuccess: (data) => {
        if (data.uuid) {
          xApp?.openSignRequest({ uuid: data.uuid });

          xApp?.on('payload', (response) => {
            if (response.reason === 'DECLINED') {
              reset();
              onLoginCancel();
              toast.error(t<string>('common:walletDialog.declined'), {
                toastId: TOAST_IDS.txDeclinded,
              });
            }
            if (response.reason === 'SIGNED') {
              toggleXAppSigned(true);
            }
          });
        }
      },
    }
  );
  const handleTransactionSuccess = useCallback(
    (user: User, accessToken: string) => {
      onLoginSuccess(user, accessToken);
      toggleSigned(true);
      onSuccess();
    },
    [onSuccess, onLoginSuccess]
  );
  const { xApp } = useXApp();

  useLoginStatusChecker(wasXAppSigned, data?.uuid, handleTransactionSuccess);

  useEffect(() => {
    // Prompt on load
    mutate();
  }, [mutate]);

  return {
    requestLogin: mutate,
    isLoading,
    isError,
    wasSigned,
    data,
  };
};
