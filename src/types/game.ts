export interface Game {
  id: number | string;
  name: string;
  category?: string;
  thumbnailUrl?: string;
  iframeCode: string;
  description?: string;
  tags?: string[];
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  rating?: number;
  plays?: number;
  slug: string;
  addedAt: string;
}

export interface GameCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  gameCount?: number;
}

export type GameSort = 'popular' | 'newest' | 'trending' | 'top-rated';

export interface GameFilterOptions {
  categories?: string[];
  tags?: string[];
  sort?: GameSort;
  search?: string;
} 