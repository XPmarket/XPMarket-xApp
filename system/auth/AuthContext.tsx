import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import { XPMARKET_API } from '@api/xpmarket/constants';
import { LOCAL_STORAGE } from '@system/constants';
import { formatError } from '@system/fetch/errors';
import { GetLoginCheckRo, PostLoginRo, User } from '@xpmarket/xpm.api.xpmarket';
import { useStorage } from '@xpmarket/xpm.system.storage';

import { routeGuard } from './authorization';

interface ProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<ProviderProps> = (props) => {
  const { children } = props;
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoggingIn, setLoggingIn] = useState<boolean>(false);
  const { events, replace, query, asPath } = useRouter();
  const {
    isInitialized: isUserInitialized,
    storedValue: storedSession,
    setStoredValue: storeSession,
  } = useStorage<string | undefined>(LOCAL_STORAGE.session, {
    type: 'local',
  });
  const {
    isInitialized: isSessionInitialized,
    storedValue: storedUser,
    setStoredValue: storeUser,
  } = useStorage<User | undefined>(LOCAL_STORAGE.user, {
    type: 'local',
  });

  const onLoginInitiate = useCallback(async (): Promise<PostLoginRo> => {
    try {
      const res = await XPMARKET_API.login.postLogin();

      setLoggingIn(true);

      return res;
    } catch (err) {
      throw formatError({ error: err, showToast: false });
    }
  }, []);

  const onLoginCheck = useCallback(
    async (id: string): Promise<GetLoginCheckRo> => {
      try {
        const res = await XPMARKET_API.login.getLoginCheck({
          id,
        });

        return res;
      } catch (err) {
        throw formatError({ error: err, showToast: false });
      }
    },
    []
  );

  const onLoginSuccess = useCallback(
    (userData: User, accessToken: string) => {
      storeUser(userData);
      storeSession(accessToken);
      setAuthenticated(true);
      setLoggingIn(false);
    },
    [storeUser, storeSession]
  );

  // eslint-disable-next-line no-console
  console.log('SET', storedUser, storedSession);

  const onLoginCancel = useCallback(() => {
    setLoggingIn(false);
  }, []);

  const onLogout = useCallback(() => {
    setAuthenticated(false);
    storeUser(undefined);
    storeSession(undefined);
    routeGuard({
      asPath,
      onRedirect: replace,
      isAuthenticated: false,
    });
  }, [asPath, replace, storeSession, storeUser]);

  // Client-side route guard
  useEffect(() => {
    const handleRouteChange = (nextRoute: string) => {
      routeGuard({
        asPath: nextRoute,
        onRedirect: replace,
        referrer: asPath,
        isAuthenticated,
      });
      setLoggingIn(false);
    };

    events.on('beforeHistoryChange', handleRouteChange);

    return () => {
      events.off('beforeHistoryChange', handleRouteChange);
    };
  }, [events, replace, query, asPath, isAuthenticated]);

  useEffect(() => {
    setAuthenticated(!!storedUser && !!storedSession);
  }, [storedUser, storedSession]);

  return (
    <AuthContext.Provider
      value={{
        user: storedUser,
        session: storedSession,
        isReady: isUserInitialized && isSessionInitialized,
        isAuthenticated,
        isLoggingIn,
        setAuthenticated,
        onLoginInitiate,
        onLoginCheck,
        onLogout,
        onLoginSuccess,
        onLoginCancel,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export interface AuthContextProps {
  user: User | undefined;
  session: string | undefined;
  isAuthenticated: boolean;
  isReady: boolean;
  isLoggingIn: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  onLoginInitiate: () => Promise<PostLoginRo>;
  onLoginCheck: (id: string) => Promise<GetLoginCheckRo>;
  onLoginSuccess: (user: User, accessToken: string) => void;
  onLoginCancel: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
