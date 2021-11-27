import { useEffect, useState } from "react";
import { SetterOrUpdater } from "recoil";
import { PFDetailDataProps } from "src/interfaces/PFData";
import { Loading } from "..";
import Main from "./main";
import Tos from "./Tos";

interface FundingProps {
  PFDetailData: PFDetailDataProps;
  isLoading: boolean;
  pageNum: number;
  setPageNum: SetterOrUpdater<number>;
  ticketNum: number;
  setTicketNum: SetterOrUpdater<number>;
  additionalSup: number | undefined;
  setAdditionalSup: SetterOrUpdater<number | undefined>;
  selectDateTime: {
    id: string;
    date: string;
    time: string;
  };
  setSelectDateTime: SetterOrUpdater<{
    id: string;
    date: string;
    time: string;
  }>;
  handlePostUserBoughtPF: (
    amount: number,
    additionalSup: number,
    pfId: string,
    rvtId: string,
    ticketNum: number,
  ) => Promise<void>;
}
const Funding = ({
  PFDetailData,
  isLoading,
  pageNum,
  setPageNum,
  ticketNum,
  setTicketNum,
  additionalSup,
  setAdditionalSup,
  selectDateTime,
  setSelectDateTime,
  handlePostUserBoughtPF,
}: FundingProps) => {
  const [page, setPage] = useState<undefined | number>();

  useEffect(() => {
    setPage(pageNum);
  }, [pageNum]);

  switch (page) {
    case undefined:
      return <Loading />;
    case 1:
      return (
        <>
          {isLoading ? (
            <Loading />
          ) : (
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
          )}
        </>
      );
    default:
      return (
        // <PageTransition pageNum={pageNum}>
        <Tos setPageNum={setPageNum} />
        // </PageTransition>
      );
  }
};

export default Funding;
