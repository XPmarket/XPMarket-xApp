import { IndexSignature } from '@xpmarket/xpm.system.types';

import { XpmarketResponse } from '../types';

export interface GetDexLadderRo extends XpmarketResponse {
  data: DexLadder;
}

export interface DexLadder {
  items: DexLadderItem[];
  system: DexCompetitionSystem;
  endDate: string;
  status: DexLadderStatus;
  position: number | null;
}

export type DexLadderStatus = 'in-progress' | 'completed';

export interface DexLadderItem {
  address: string;
}

export type DexCompetitionSystem = IndexSignature<{
  mythic: RarityRange;
  legendary: RarityRange;
  epic: RarityRange;
  rare: RarityRange;
  uncommon: RarityRange;
  common: RarityRange;
}>;

export interface RarityRange {
  from: number;
  to: number;
}
