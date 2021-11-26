import { useState } from "react";
import { PFDetailDataProps } from "src/interfaces/PFData";
import Check from "./check";
import Main from "./main";
import Tos from "./Tos";

interface FDInfoDataProps {
  date: string;
  endDate: string;
  state: string;
  ticketNum: number;
  additionSup: number;
  totalPrice: number;
}

interface FundingProps {
  FDInfoData: FDInfoDataProps;
  PFDetailData: PFDetailDataProps;
  timeList?: string[];
}
const Funding = ({ FDInfoData, PFDetailData, timeList }: FundingProps) => {
  const [pageNum, setPageNum] = useState(0);
  const [ticketNum, setTicketNum] = useState(0);
  const [selectDateTime, setSelectDateTime] = useState({
    date: "",
    time: "",
  });

  switch (pageNum) {
    case 1:
      return (
        <Main
          setPageNum={setPageNum}
          ticketNum={ticketNum}
          setTicketNum={setTicketNum}
          PFDetailData={PFDetailData}
          FDInfoData={FDInfoData}
          selectDateTime={selectDateTime}
          setSelectDateTime={setSelectDateTime}
          timeList={timeList}
        />
      );
    case 2:
      return (
        <Check
          FDInfoData={FDInfoData}
          PFDetailData={PFDetailData}
          selectedDate={selectDateTime.date}
          selectedTime={selectDateTime.time}
        />
      );
    default:
      return <Tos setPageNum={setPageNum} />;
  }
};

export default Funding;
