

export interface HeroItem {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
}

export interface HeroResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HeroItem[];
} 