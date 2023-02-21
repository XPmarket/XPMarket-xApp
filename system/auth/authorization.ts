import { APP_ROUTES } from '@system/route/constants';
import { LoginQueryParams } from '@templates/login/types';
import { findRoute, withQueryParams } from '@xpmarket/xpm.system.routes';

interface Params<T> {
  asPath: string;
  isAuthenticated: boolean;
  onRedirect: (path: string) => T;
  referrer?: string;
}

export const routeGuard = <T>(params: Params<T>): T | undefined => {
  const { asPath, onRedirect, isAuthenticated } = params;
  const route = findRoute(asPath, APP_ROUTES);

  if (route?.isAuthOnly && !isAuthenticated) {
    const path = withQueryParams(APP_ROUTES.login.path, {
      redirectTo: route.path,
    } as LoginQueryParams);

    return onRedirect(path);
  }

  if (route?.isGuestOnly && isAuthenticated) {
    return onRedirect(APP_ROUTES.landing.path);
  }
};
