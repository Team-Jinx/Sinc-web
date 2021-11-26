import type { NextPage } from "next";
import { useRecoilValue } from "recoil";
import { Funding } from "src/components/templates";
import states from "src/modules";

const FundingPage: NextPage = () => {
  const PFDetailData = useRecoilValue(states.PFDetailDataState);

  return (
    <Funding
      FDInfoData={FDInfoData}
      PFDetailData={PFDetailData}
      timeList={["23:00", "21:00", "19:00"]}
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
