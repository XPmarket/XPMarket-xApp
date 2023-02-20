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
import Cookies, { CookieAttributes } from 'js-cookie';
import { useRouter } from 'next/router';

import { XPMARKET_API } from '@api/xpmarket/constants';
import { COOKIE_STORAGE } from '@system/constants';
import { formatError } from '@system/fetch/errors';
import { GetLoginCheckRo, PostLoginRo, User } from '@xpmarket/xpm.api.xpmarket';
import { parseStringified } from '@xpmarket/xpm.system.storage';

import { routeGuard } from './authorization';

interface ProviderProps {
  children: ReactNode;
  reqSession: string | undefined;
  reqUser: string | undefined;
}

export const AuthProvider: FC<ProviderProps> = (props) => {
  const { children, reqSession, reqUser } = props;
  const hasAuthRequirements = !!reqUser && !!reqSession;
  const [isAuthenticated, setAuthenticated] =
    useState<boolean>(hasAuthRequirements);
  const [user, setUser] = useState<User | undefined>(
    hasAuthRequirements ? parseStringified<User>(reqUser) : undefined
  );
  const [isLoggingIn, setLoggingIn] = useState<boolean>(false);
  const { events, replace, query, asPath } = useRouter();

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
    (
      userData: User,
      accessToken: string,
      sameSite: CookieAttributes['sameSite'] = 'Lax'
    ) => {
      Cookies.set(COOKIE_STORAGE.user, JSON.stringify(userData), {
        sameSite,
        expires: 365,
        secure: true,
      });
      Cookies.set(COOKIE_STORAGE.session, accessToken, {
        sameSite,
        expires: 365,
        secure: true,
      });
      setUser(userData);
      setAuthenticated(true);
      setLoggingIn(false);
    },
    []
  );

  const onLoginCancel = useCallback(() => {
    setLoggingIn(false);
  }, []);

  const onLogout = useCallback(() => {
    const cookieSession = Cookies.get(COOKIE_STORAGE.session);
    const cookieUser = Cookies.get(COOKIE_STORAGE.user);

    if (isAuthenticated || !!cookieUser || !cookieSession) {
      setUser(undefined);
      setAuthenticated(false);
      Cookies.remove(COOKIE_STORAGE.user);
      Cookies.remove(COOKIE_STORAGE.session);
      routeGuard({
        asPath,
        onRedirect: replace,
        stringifiedUser: undefined,
        session: undefined,
      });
    }
  }, [isAuthenticated, asPath, replace]);

  // Client-side route guard
  useEffect(() => {
    const handleRouteChange = (nextRoute: string) => {
      const cookieUser = Cookies.get(COOKIE_STORAGE.user);
      const cookieSession = Cookies.get(COOKIE_STORAGE.session);

      routeGuard({
        asPath: nextRoute,
        onRedirect: replace,
        stringifiedUser: cookieUser,
        session: cookieSession,
        referrer: asPath,
      });
      setLoggingIn(false);
    };

    events.on('beforeHistoryChange', handleRouteChange);

    return () => {
      events.off('beforeHistoryChange', handleRouteChange);
    };
  }, [events, replace, query, asPath]);

  useEffect(() => {
    const stringifiedUser = Cookies.get(COOKIE_STORAGE.user);
    const stringifiedSession = Cookies.get(COOKIE_STORAGE.session);
    const user = parseStringified<User>(stringifiedUser);

    if (user && stringifiedSession) {
      setUser(user);
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  onLoginInitiate: () => Promise<PostLoginRo>;
  onLoginCheck: (id: string) => Promise<GetLoginCheckRo>;
  onLoginSuccess: (
    user: User,
    accessToken: string,
    sameSite?: CookieAttributes['sameSite']
  ) => void;
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
