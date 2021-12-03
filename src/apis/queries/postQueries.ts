import { PostFDDataProps } from "src/interfaces/PFData";

const postUserBoughtPF = ({
  amount,
  bank,
  donation,
  paymentKey,
  pfId,
  receiptUrl,
  orderId,
  reservationTimeId,
  ticketCount,
  userId,
}: PostFDDataProps) => `
  mutation {
    createUsersBoughtPerformances(
      usersBoughtPerformancesData: {
        amount: ${amount},
        bank: "${bank}",
        donation: ${donation},
        paymentKey:"${paymentKey}",
        performanceId:"${pfId}",
        orderId:"${orderId}",
        receiptUrl:"${receiptUrl}",
        reservationTimeId:"${reservationTimeId}",
        ticketCount: ${ticketCount},
        userId: "${userId}",
      }
    ) {
      id
      status
    }
  }
`;

// @ts-ignore
const postCheerPF = (pfId: string, storyId: string, userId: string) => `
  mutation{
    createUsersCheeredPerformances(
      usersCheeredPerformancesData: {
        performanceId: "${pfId}",
        storyId: "${storyId}",
        userId: "${userId}",
      }
    ) {
      id
    }
  }
`;

const postQueries = {
  postUserBoughtPF,
  postCheerPF,
};

export default postQueries;
