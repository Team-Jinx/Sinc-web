import type { NextPage } from "next";
import { useRecoilState } from "recoil";
import fetcher from "src/apis";
import { postQueries } from "src/apis/queries";
import { Funding } from "src/components/templates";
import states from "src/modules";

const FundingPage: NextPage = () => {
  const [PFDetailData, setPFDetailData] = useRecoilState(
    states.PFDetailDataState,
  );

  const handlePostUserBoughtPF = async (
    amount: number,
    additionalSup: number,
    pfId: string,
    rvtId: string,
    ticketNum: number,
  ) => {
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
  };

  return (
    <Funding
      PFDetailData={PFDetailData}
      handlePostUserBoughtPF={handlePostUserBoughtPF}
    />
  );
};

export default FundingPage;

// mock-data
const FDInfoData = {
  date: "9월 12일(일)",
  endDate: "9월 20일(월)",
  state: "완료",
  ticketNum: 50,
  additionSup: 5000,
  totalPrice: 10000,
};
