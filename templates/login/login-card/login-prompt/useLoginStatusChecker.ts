import { AuthContextProps, useAuth } from '@system/auth/AuthContext';
import { CACHE_KEYS, FETCH_INTERVAL } from '@system/fetch/constants';
import { formatError } from '@system/fetch/errors';
import { useApiQuery } from '@system/fetch/useApiQuery';
import { GetLoginCheckRo, User } from '@xpmarket/xpm.api.xpmarket';

export const useLoginStatusChecker = (
  wasSigned: boolean,
  uuid: string | undefined,
  onSuccess: (user: User, accessToken: string) => void
): void => {
  const { onLoginCheck } = useAuth();

  useApiQuery(
    CACHE_KEYS.loginObserve(uuid),
    (context) => requestCheck(context.queryKey[1], onLoginCheck),
    {
      refetchInterval: (data) =>
        !data?.access_token ? FETCH_INTERVAL.loginObserve : false,
      enabled: wasSigned && !!uuid,
      onSuccess: (data) => {
        if (data.user && data.access_token) {
          onSuccess(data.user, data.access_token);
        }
      },
    }
  );
};

const requestCheck = async (
  uuid: string | null,
  onLoginCheck: AuthContextProps['onLoginCheck']
): Promise<GetLoginCheckRo> => {
  if (!uuid) {
    throw new Error('uuid - undefined');
  }

  try {
    const res = await onLoginCheck(uuid);

    return res;
  } catch (error) {
    throw formatError({ error, showToast: false });
  }
};
