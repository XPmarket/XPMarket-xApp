import { ParsedUrlQuery } from 'querystring';

export interface LoginQueryParams extends ParsedUrlQuery {
  redirectTo?: string;
}
