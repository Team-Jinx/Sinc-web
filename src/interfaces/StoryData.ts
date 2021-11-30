import { PFDetailDataProps } from "./PFData";

export interface StoryDataProps {
  backgroundUrl: string;
  cheerCount: number;
  createdAt: number;
  description?: string;
  id: string;
  performanceId: string;
  performance: PFDetailDataProps;
}

export interface PopStoriesDataProps {
  backgroundUrl: string;
  id: string;
}
