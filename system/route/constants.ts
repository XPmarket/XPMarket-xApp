import { AppRoutes } from './types';

export const APP_ROUTES: AppRoutes = {
  landing: {
    path: '/swiper',
    isAuthOnly: true,
    isGuestOnly: false,
  },
  swiper: {
    path: '/swiper',
    isAuthOnly: true,
    isGuestOnly: false,
  },
  login: {
    path: '/login',
    isAuthOnly: false,
    isGuestOnly: false,
  },
};
