export interface StoryDataProps {
  backgroundUrl: string;
  cheerCount: number;
  createdAt: number;
  description?: string;
  id: string;
  performanceId: string;
  performance: {
    title: string;
    posterUrl?: string;
    artist: {
      agency: string;
      name: string;
    };
  };
}

export interface PopStoriesDataProps {
  backgroundUrl: string;
  id: string;
}
