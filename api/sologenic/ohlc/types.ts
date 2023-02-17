import { IndexSignature } from '@xpmarket/xpm.system.types';

export type GetOhlcQueryParams = IndexSignature<{
  symbol: string;
  from: string;
  to: string;
  period: Period;
}>;

export type GetOhlcRo = CharHistoryPoint[];

export type CharHistoryPoint = [number, string, string, string, string, string];

export type Period =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '3h'
  | '6h'
  | '12h'
  | '1d'
  | '1w';
