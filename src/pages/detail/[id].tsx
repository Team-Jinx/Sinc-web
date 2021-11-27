import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Detail } from "src/components/templates";
import { PFDetailDataProps } from "src/interfaces/PFData";
import states from "src/modules";
import useSWR from "swr";

interface DetailPageProps {
  initPFDetailData: PFDetailDataProps;
}
const DetailPage = ({ initPFDetailData }: DetailPageProps) => {
  const router = useRouter();

  const setPFDetailData = useSetRecoilState(states.PFDetailDataState);
  const { data: PFDetailData } = useSWR(
    getQueries.getPF(String(router.query.id)),
    fetcher,
    {
      fallbackData: initPFDetailData,
      onSuccess: (data) => {
        setPFDetailData(data.findPerformanceById);
      },
    },
  );

  const setPageNum = useSetRecoilState(states.PageNumState);
  const setTicketNum = useSetRecoilState(states.TicketNumState);
  const setAdditionalSup = useSetRecoilState(states.AdditionalSupState);
  const setSelectDateTime = useSetRecoilState(states.SelectDateTimeState);

  const handleInitializeData = () => {
    setPageNum(0);
    setTicketNum(0);
    setAdditionalSup(undefined);
    setSelectDateTime({
      id: "",
      date: "",
      time: "",
    });
  };

  return (
    <>
      {PFDetailData === undefined ? (
        <div>...loading</div>
      ) : (
        <Detail
          PFDetailData={PFDetailData.findPerformanceById}
          handleInitializeData={handleInitializeData}
        />
      )}
    </>
  );
};

export default DetailPage;

DetailPage.getInitialProps = async (ctx: any) => {
  const queryID = ctx.query.id;

  const PFDetailData = await fetcher(getQueries.getPF(queryID));

  return { PFDetailData: PFDetailData.findPerformanceById };
};
