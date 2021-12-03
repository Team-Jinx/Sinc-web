const postUserBoughtPF = (
  amount: number,
  additionalSup: number,
  pfId: string,
  rvtId: string,
  ticketNum: number,
) => `
    mutation {
      createUsersBoughtPerformances(
          usersBoughtPerformancesData: {
              amount: ${amount},
              bank: "",
              donation: ${additionalSup},
              orderId: "",
              paymentKey: "",
              performanceId: "${pfId}",
              receiptUrl: "",
              reservationTimeId: "${rvtId}",
              ticketCount: ${ticketNum},
              userId: "ckwgx985s0000ukireeh9of4m"
            }
        ) {
          performance {
            fundingStatus
          }
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
