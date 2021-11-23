import { useState } from "react";
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
interface PFInfoDataProps {
  title: string;
  artist: string;
  startDate: string;
  endDate: string;
  location: string;
  runtime: number;
  ticketPrice: number;
}
interface FundingProps {
  FDInfoData: FDInfoDataProps;
  PFInfoData: PFInfoDataProps;
  timeList?: string[];
}
const Funding = ({ FDInfoData, PFInfoData, timeList }: FundingProps) => {
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
          PFInfoData={PFInfoData}
          FDInfoData={FDInfoData}
          selectDateTime={selectDateTime}
          setSelectDateTime={setSelectDateTime}
          timeList={timeList}
        />
      );
    case 2:
      return (
        <Check
          setPageNum={setPageNum}
          FDInfoData={FDInfoData}
          PFInfoData={PFInfoData}
          selectedDate={selectDateTime.date}
          selectedTime={selectDateTime.time}
        />
      );
    default:
      return <Tos setPageNum={setPageNum} />;
  }
};

export default Funding;
