import { CategoryType } from "./types";

export interface PfDataQueryProps {
  category: CategoryType;
  place?: string;
  title?: string;
}

export interface PFInfoDataProps {
  id: string;
  artist: {
    agency: string;
    name: string;
  };
  posterUrl?: string;
  place: string;
  title: string;
  reservationTimes: string[];
}

export interface PFDetailDataProps {
  id: string;
  artist: {
    agency: string;
    name: string;
  };
  artistId: string;
  posterUrl?: string;
  place: string;
  title: string;
  reservationTimes: string[];
  showTime: string;
  runningTime: number;
  price: number;
  description?: string;
}
