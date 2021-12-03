export type CategoryType = "MUSIC" | "DANCING" | "ACTING" | "OTHER";

export type StatusType = "PROGRESS" | "SUCCESS";

export type DirectionType = "ASC" | "DESC";

export type ReservationTimeType = {
  id: string;
  toReserveAt: number;
};

export type BannerDataType = {
  name: string;
  agency: string;
  url?: string;
};
