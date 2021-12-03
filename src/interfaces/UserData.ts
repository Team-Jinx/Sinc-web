export interface UserDataProps {
  id: string;
  nickname: string;
  role: string;
  profileUrl?: string;
}

export interface UserTicketDataProps {
  reservationTime: {
    toReserveAt: number;
  };
  ticketCount: number;
  performance: {
    title: string;
  };
}
