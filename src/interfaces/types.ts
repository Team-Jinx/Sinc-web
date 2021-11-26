export type CategoryType = "MUSIC" | "DANCING" | "ACTING" | "OTHER";

export type ReservationTimeType = {
  createdAt: Date;
  id: number;
  performanceId: string;
  toReserveAt: Date;
  totalTicketCount: number;
  updatedAt: Date;
};
