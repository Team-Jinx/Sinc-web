import type { NextPage } from "next";
import { useState } from "react";
import { useRecoilState } from "recoil";
import fetcher from "src/apis";
import { postQueries } from "src/apis/queries";
import { Funding } from "src/components/templates";
import states from "src/modules";

const FundingPage: NextPage = () => {
  const [PFDetailData, setPFDetailData] = useRecoilState(
    states.PFDetailDataState,
  );
  const [isLoading, setIsLoaing] = useState(false);

  const handlePostUserBoughtPF = async (
    amount: number,
    additionalSup: number,
    pfId: string,
    rvtId: string,
    ticketNum: number,
  ) => {
    setIsLoaing(true);
    const res = await fetcher(
      postQueries.postUserBoughtPF(
        amount,
        additionalSup,
        pfId,
        rvtId,
        ticketNum,
      ),
    );
    setPFDetailData({
      ...PFDetailData,
      fundingStatus:
        res.createUsersBoughtPerformances.performance.fundingStatus,
    });
    setIsLoaing(false);
  };

  return (
    <Funding
      isLoading={isLoading}
      PFDetailData={PFDetailData}
      handlePostUserBoughtPF={handlePostUserBoughtPF}
    />
  );
};

export default FundingPage;
