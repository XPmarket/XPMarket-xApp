import { QueryClient } from 'react-query';

export const CACHE_KEYS = {
  transactionObserve: (id: string | undefined | null = null) =>
    ['transaction-observe', id] as const,
  balance: (userAddress: string | undefined | null = null) =>
    ['balance', userAddress] as const,
  swipeHistory: (walletAddress: string | undefined | null = null) =>
    ['nft-swipe-history', walletAddress] as const,
  swipeList: (walletAddress: string | undefined | null = null) =>
    ['nft-swipe-list', walletAddress] as const,
  loginObserve: (id: string | undefined | null = null) =>
    ['login-observe', id] as const,
};

export const QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const FETCH_INTERVAL = {
  transactionObserve: 3000,
  loginObserve: 3000,
  accountObjects: 10000,
  accountOffers: 20000,
  accountTx: 8000,
} as const;

export const STALE_TIME = {
  accountObjects: 5000,
};
