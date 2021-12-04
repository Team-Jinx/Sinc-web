import { PFInfoDataProps } from "./PFData";

export interface ArtistDataProps {
  agency: string;
  id: string;
  name: string;
  profileUrl?: string;
  inquiryLink?: string;
  _count?: {
    performances: number;
  };
}

export interface ArtistDetailDataProps {
  id: string;
  agency: string;
  name: string;
  description?: string;
  inquiryLink?: string;
  performances: PFInfoDataProps[];
  profileUrl?: string;
}
