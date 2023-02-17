import { AppRoutes } from './types';

export const APP_ROUTES: AppRoutes = {
  landing: {
    path: '/',
    isAuthOnly: true,
    isGuestOnly: false,
  },
  login: {
    path: '/login',
    isAuthOnly: false,
    isGuestOnly: false,
  },
};

export const BASE_API_PROD_URL = 'https://api.xpmarket.com';
