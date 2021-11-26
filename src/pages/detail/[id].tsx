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
        // date 배열 -> 형변환
        setPFDetailData(data.findPerformanceById);
      },
    },
  );

  return (
    <>
      {PFDetailData === undefined ? (
        <div>...loading</div>
      ) : (
        <Detail
          PFDetailData={PFDetailData.findPerformanceById}
          FDInfoData={FDInfoData}
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

// mock-data
const FDInfoData = {
  soldTicket: 50,
  leftTicket: 50,
  percent: 50,
  leftPeriod: 50,
  totalPrice: 5000,
  likeNum: 5000,
};
