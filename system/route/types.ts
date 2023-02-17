import { AppRoute } from '@xpmarket/xpm.system.routes';
import { IndexSignature } from '@xpmarket/xpm.system.types';

export type AppRoutes = IndexSignature<{
  landing: AppRoute;
  login: AppRoute;
}>;
