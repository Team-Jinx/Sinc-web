import { PFInfoDataProps } from "./PFData";

export interface ArtistDataProps {
  agency: string;
  id: string;
  name: string;
  profileUrl?: string;
  performances: PFInfoDataProps[];
}
