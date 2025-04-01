export interface Game {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  url: string;
  rating: number;
  isNew: boolean;
  isHot: boolean;
  tags: string[];
} 