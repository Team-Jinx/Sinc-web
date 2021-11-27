import { useState } from "react";
import { PFDetailDataProps } from "src/interfaces/PFData";
import { PageTransition } from "src/libs";
import Check from "./check";
import Main from "./main";
import Tos from "./Tos";

interface FundingProps {
  PFDetailData: PFDetailDataProps;
  handlePostUserBoughtPF: (
    amount: number,
    additionalSup: number,
    pfId: string,
    rvtId: string,
    ticketNum: number,
  ) => Promise<void>;
}
const Funding = ({ PFDetailData, handlePostUserBoughtPF }: FundingProps) => {
  const [pageNum, setPageNum] = useState(1);

  const [ticketNum, setTicketNum] = useState(0);
  const [additionalSup, setAdditionalSup] = useState<number | undefined>();
  const [selectDateTime, setSelectDateTime] = useState({
    id: "",
    date: "",
    time: "",
  });

  switch (pageNum) {
    case 1:
      return (
        <PageTransition pageNum={pageNum}>
          <Main
            setPageNum={setPageNum}
            ticketNum={ticketNum}
            setTicketNum={setTicketNum}
            additionalSup={additionalSup}
            setAdditionalSup={setAdditionalSup}
            PFDetailData={PFDetailData}
            selectDateTime={selectDateTime}
            setSelectDateTime={setSelectDateTime}
            handlePostUserBoughtPF={handlePostUserBoughtPF}
          />
        </PageTransition>
      );
    case 2:
      return (
        <PageTransition pageNum={pageNum}>
          <Check
            PFDetailData={PFDetailData}
            ticketNum={ticketNum}
            additionalSup={additionalSup}
            selectedDate={selectDateTime.date}
            selectedTime={selectDateTime.time}
          />
        </PageTransition>
      );
    default:
      return (
        <PageTransition pageNum={pageNum}>
          <Tos setPageNum={setPageNum} />
        </PageTransition>
      );
  }
};

export default Funding;
