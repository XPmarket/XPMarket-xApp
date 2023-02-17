import { AnyObject } from '@xpmarket/xpm.system.types';

export interface XpmarketResponse {
  success: boolean;
  errorCode?: string;
}

export interface BackendTablePaginationFilters<SortableCols extends string> {
  limit: number;
  offset: number;
  sortDirection: 'asc' | 'desc';
  keyword: string;
  sort: SortableCols;
}

export interface XpmarketPaginatedResponse<T> extends XpmarketResponse {
  data: PaginatedData<T>;
}

export interface PaginatedData<T> extends AnyObject {
  items: T[];
  totalResults: number;
  nextMarker?: null | string;
  currentMarker?: null | string;
}
