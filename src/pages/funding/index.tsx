import type { NextPage } from "next";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { postQueries } from "src/apis/queries";
import { Funding } from "src/components/templates";
// import { CreateUUID } from "src/libs";
import states from "src/modules";
// import { loadTossPayments } from "@tosspayments/sdk";
import { useRouter } from "next/router";
// import router from "next/router";

const FundingPage: NextPage = () => {
  const router = useRouter();

  const [pageNum, setPageNum] = useRecoilState(states.PageNumState);
  const [PFDetailData, setPFDetailData] = useRecoilState(
    states.PFDetailDataState,
  );
  const [ticketNum, setTicketNum] = useRecoilState(states.TicketNumState);
  const [additionalSup, setAdditionalSup] = useRecoilState(
    states.AdditionalSupState,
  );
  const [selectDateTime, setSelectDateTime] = useRecoilState(
    states.SelectDateTimeState,
  );
  const userData = useRecoilValue(states.UserDataState);

  const [isLoading, setIsLoaing] = useState(false);

  const handlePostUserBoughtPF = async (
    amount: number,
    additionalSup: number,
    pfId: string,
    rvtId: string,
    ticketNum: number,
  ) => {
    setIsLoaing(true);
    // 토스 페이먼츠 카드 결제
    // const tossPayments = await loadTossPayments(CLIENT_KEY);
    // tossPayments.requestPayment("카드", {
    //   amount: additionalSup
    //     ? ticketNum * PFDetailData.price + additionalSup
    //     : ticketNum * PFDetailData.price,
    //   orderId: PFDetailData.id + CreateUUID(),
    //   orderName: PFDetailData.title + " 후원",
    //   customerName: userData.nickname,
    //   successUrl: `${DOMAIN}/funding/success`,
    //   failUrl: `${DOMAIN}/funding/success`,
    // });
    // api call
    const res = await fetcher(
      postQueries.postUserBoughtPF({
        amount,
        donation: additionalSup,
        pfId,
        reservationTimeId: rvtId,
        ticketCount: ticketNum,
        userId: userData.id,
      }),
    );
    setPFDetailData({
      ...PFDetailData,
      fundingStatus: res.createUsersBoughtPerformances.status,
    });
    setIsLoaing(false);
    router.push("/funding/success");
  };

  return (
    <Funding
      isLoading={isLoading}
      PFDetailData={PFDetailData}
      pageNum={pageNum}
      setPageNum={setPageNum}
      ticketNum={ticketNum}
      setTicketNum={setTicketNum}
      additionalSup={additionalSup}
      setAdditionalSup={setAdditionalSup}
      selectDateTime={selectDateTime}
      setSelectDateTime={setSelectDateTime}
      handlePostUserBoughtPF={handlePostUserBoughtPF}
    />
  );
};

export default FundingPage;
