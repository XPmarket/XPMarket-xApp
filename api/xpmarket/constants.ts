export const API_URLS = {
  dex: {
    list: '/dex/list',
    info: '/dex/info',
    balances: '/dex/balances',
    openOrders: '/dex/open-orders',
  },
  trustline: {
    latest: '/trustline/latest',
    set: '/trustline/:code/:issuer/set',
    remove: '/trustline/:code/:issuer/remove',
    check: '/trustline/:code/:issuer/status',
  },
  stats: {
    main: '/stats/main',
    tokens: '/stats/token',
    nfts: '/stats/nft',
  },
  rating: {
    summary: '/rating/summary',
    top: {
      index: '/rating/top',
      header: '/rating/top/header',
    },
    all: '/rating/all',
    tokensHeatmap: '/rating/tokens/heatmap/:period',
    nftsHeatmap: '/rating/nfts/heatmap/:period',
    exchanges: '/rating/exchanges',
    richestCommunity: '/rating/richest-community',
    nftCollections: '/rating/collections/:period',
  },
  login: {
    index: '/login',
    check: '/login/:id/check',
  },
  accounts: {
    index: '/accounts',
    switch: '/accounts/:address/switch',
    remove: '/accounts/:address/remove',
  },
  currency: {
    index: '/currency/:code/:issuer',
    basic: '/currency/basic/:code/:issuer',
    prices: '/currency/:code/:issuer/prices/:period',
    volumes: '/currency/:code/:issuer/volume/:period',
    rank: '/currency/:code/:issuer/rank/:period',
  },
  portfolio: {
    index: '/portfolio',
    profitAndLoss: '/portfolio/profits',
    tokenOrders: '/portfolio/assets/orders',
    nftOrders: '/portfolio/nfts/orders',
    nftOrderCancel: '/portfolio/nfts/orders/:offerId/cancel',
    nfts: '/portfolio/nfts-v2',
  },
  swap: {
    index: '/swap',
    list: '/swap/list',
    rate: '/swap/rate',
    impact: '/swap/impact',
  },
  admin: {
    autoLogin: '/admin/autologin/:walletAddress',
  },
  fx: {
    index: '/fx',
    top: '/fx/top',
  },
  search: {
    index: '/search',
  },
  nft: {
    index: '/nft',
    collection: '/nft/collections/:id',
    currencies: '/nft/currencies',
    createOffer: '/nft/:id/offers/create',
    acceptOffer: '/nft/:id/offers/accept',
    acceptOfferType: '/nft/:id/offers/accept/:type',
    overview: '/nft/:id',
    search: '/nft/search',
    refresh: '/nft/:id/refresh',
    swipeList: '/swipe/nft',
    swipeHistory: '/swipe/history',
    swipeVote: '/swipe/nft/:nftId/:decision',
  },
  constests: {
    dex: '/contests/dex',
  },
} as const;
