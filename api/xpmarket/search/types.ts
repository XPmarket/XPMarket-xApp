import { XpmarketResponse } from '../types';

export interface GetSearchRo extends XpmarketResponse {
  data: SearchData;
}

export interface SearchData {
  tokens: TokenSearchItem[];
  nftCollections: NftCollectionSearchItem[];
}

export interface TokenSearchItem {
  id: number;
  code: string;
  issuer: string | undefined;
  title: string;
  gravatar: string;
}

export interface NftCollectionSearchItem {
  collectionId: number;
  title: string;
  gravatar: string;
}
