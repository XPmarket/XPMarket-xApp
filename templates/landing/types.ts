import { ParsedUrlQuery } from 'querystring';

export interface LandingQueryParams extends ParsedUrlQuery {
  xAppStyle: XAppThemeMode;
}

export type XAppThemeMode = 'LIGHT' | 'DARK' | 'MOONLIGHT' | 'ROYAL';
