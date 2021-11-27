import { CategoryType, ReservationTimeType, StatusType } from "./types";

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
  reservationTimes: ReservationTimeType[];
}

export interface PFDetailDataProps {
  id: string;
  artist: {
    agency: string;
    name: string;
  };
  artistId: string;
  amount: number;
  posterUrl?: string;
  place: string;
  title: string;
  showTime: string;
  runningTime: number;
  price: number;
  description?: string;
  reservationTimes: ReservationTimeType[];
  toEndAt: number;
  fundingStatus: StatusType;
  totalTicketCount: number;
  ticketCount: number;
  cheerCount: number;
}
