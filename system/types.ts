import { ParsedUrlQuery } from 'querystring';

export interface XAppQueryParams extends ParsedUrlQuery {
  xAppStyle: XAppThemeMode;
}

export type XAppThemeMode = 'LIGHT' | 'DARK' | 'MOONLIGHT' | 'ROYAL';
