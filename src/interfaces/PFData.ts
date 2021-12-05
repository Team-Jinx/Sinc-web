import { ArtistDataProps } from "./ArtistData";
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
  createdAt: number;
  posterUrl?: string;
  place: string;
  title: string;
  reservationTimes: ReservationTimeType[];
}

export interface PFDetailDataProps {
  id: string;
  artist: ArtistDataProps;
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

export interface PostFDDataProps {
  amount: number;
  bank?: string;
  donation: number;
  paymentKey?: string;
  pfId: string;
  receiptUrl?: string;
  orderId?: string;
  reservationTimeId: string;
  ticketCount: number;
  userId: string;
}

export interface HotPFDataPRops {
  id: string;
  artist: {
    agency: string;
    name: string;
  };
  posterUrl: string;
  title: string;
  reservationTimes: {
    toReserveAt: number;
  }[];
  ticketPercentage: number;
}
