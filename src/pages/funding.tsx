import type { NextPage } from "next";
import { Funding } from "src/components/templates";

const FundingPage: NextPage = () => {
  return <Funding FDInfoData={FDInfoData} PFInfoData={PFInfoData} />;
};

export default FundingPage;

// mock-data
const FDInfoData = {
  date: "9월 12일(일)",
  endDate: "9월 20일(월)",
  state: "완료",
};
const PFInfoData = {
  title: "공연 이름",
  artist: "아티스트 이름",
  date: "2021년 9월 19일(목) 14:00",
  ticketNum: 1,
  ticketPrice: 5000,
  additionSup: 5000,
  totalPrice: 10000,
};
