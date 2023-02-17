import { IndexSignature } from '@xpmarket/xpm.system.types';

export type GetExchangeHistoryRouteParams = IndexSignature<{
  baseToken: string; // Hex format
  counterToken: string; // Hex format
}>;

export type GetExchangeHistoryQueryParams = IndexSignature<{
  descending: boolean; // If true, return results in reverse chronological order.
  limit: number;
  result?: 'tesSUCCESS';
  interval?: Interval; // Aggregation interval
  start?: string; // ISO 8601 Timestamp Format in UTC (YYYY-MM-DDThh:mm:ssZ)
  end?: string; // ISO 8601 Timestamp Format in UTC (YYYY-MM-DDThh:mm:ssZ)
  reduce?: boolean; // If true, aggregate all individual results. The default is false.
  marker?: boolean; // Pagination key from previously returned response.
  autobridged?: boolean; // If true, filter results to autobridged exchanges only.
  format?: boolean; // Format of returned results: csv or json. The default is json.
}>;

export type Interval =
  | '1minute'
  | '3minute'
  | '5minute'
  | '15minute'
  | '30minute'
  | '1hour'
  | '3hour'
  | '6hour'
  | '12hour'
  | '1day'
  | '7day';

export interface GetExchangeHistoryRo {
  result: string;
  count: number;
  exchanges: HistoryExchange[];
  marker?: string;
}

export interface HistoryExchange {
  base_amount: string;
  counter_amount: string;
  node_index: number;
  rate: string;
  tx_index: number;
  buyer: string;
  executed_time: string;
  ledger_index: number;
  offer_sequence: number;
  provider: string;
  seller: string;
  taker: string;
  tx_hash: string;
  tx_type: string;
  base_currency: string;
  base_issuer: string;
  counter_currency: string;
}

export interface IntervalExchange {
  base_currency: string;
  base_volume: string;
  buy_volume: number;
  close: string;
  close_time: string;
  count: number;
  counter_currency: string;
  counter_issuer: string;
  counter_volume: string;
  high: string;
  low: string;
  open: string;
  open_time: string;
  start: string;
  vwap: string;
}
