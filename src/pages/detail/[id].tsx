import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Detail } from "src/components/templates";
import { PFDetailDataProps } from "src/interfaces/PFData";
import { NoticeDataProps } from "src/interfaces/StoryData";
import states from "src/modules";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

interface DetailPageProps {
  initPFDetailData: PFDetailDataProps;
}
const DetailPage = ({ initPFDetailData }: DetailPageProps) => {
  const router = useRouter();
  const userData = useRecoilValue(states.UserDataState);

  // 공연 상세성보 데이터
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

  // 새소식 데이터
  const [notiList, setNotiList] = useState<NoticeDataProps[]>([]);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.findStories.length) {
      return null;
    }
    return getQueries.getNotice({
      performanceId: PFDetailData.id,
      userId: userData.id,
      limit: 15,
      offset: pageIndex * 15,
    });
  };
  const { size: pageIndex, setSize: setPageIndex } = useSWRInfinite(
    getKey,
    fetcher,
    {
      onSuccess: (data) => {
        // console.log(data);
        data.map((d) => {
          console.log(d.findStories);
          setNotiList(notiList.concat(d.findStories));
        });
      },
      errorRetryCount: 3,
      revalidateAll: true,
      // persistSize: true,
      // revalidateOnFocus: false,
    },
  );

  // 유저가 선택한 데이터
  const setPageNum = useSetRecoilState(states.PageNumState);
  const setTicketNum = useSetRecoilState(states.TicketNumState);
  const setAdditionalSup = useSetRecoilState(states.AdditionalSupState);
  const setSelectDateTime = useSetRecoilState(states.SelectDateTimeState);

  // 유저가 선택한 데이터 초기화
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
          NotiDatas={notiList}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
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
