import { PFDetailDataProps } from "./PFData";

export interface StoryDataProps {
  imageUrl?: string | null;
  videoUrl?: string | null;
  cheerCount: number;
  createdAt: number;
  description?: string;
  id: string;
  amount: number;
  ticketCount: number;
  performanceId: string;
  performance: PFDetailDataProps;
  usersCheeredPerformances: null | any;
}

export interface PopStoriesDataProps {
  videoUrl: string;
  id: string;
}

export interface GetNoticeProps {
  artistId?: string;
  performanceId?: string;
  type?: string;
  userId?: string;
  limit?: number;
  offset?: number;
  keyword?: string;
}

export interface NoticeDataProps {
  id: string;
  imageUrl: string;
  videoUrl: string;
  type: string;
  notifications: {
    id: string;
    storyId: string;
  };
}
