
export enum AppMode {
  EDIT = 'edit',
  ANALYZE = 'analyze',
  TIME_TRAVEL = 'time-travel',
}

export interface GeneratedContent {
  type: 'image' | 'text';
  data: string;
}

export interface HistoricalScene {
  id: string;
  name: string;
  imageUrl: string;
  prompt: string;
}
