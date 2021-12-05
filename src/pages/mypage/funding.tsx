import router from "next/router";
// import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, PFInfoListView } from "src/components/templates";
// import { PFInfoDataProps } from "src/interfaces/PFData";
import states from "src/modules";
import useSWR from "swr";
// import useSWRInfinite from "swr/infinite";

const MYFundingPage = () => {
  const userData = useRecoilValue(states.UserDataState);

  // 업로드 영상 데이터
  // const [PFList, setPFList] = useState<PFInfoDataProps[]>([]);
  // const getKey = (pageIndex: number, previousPageData: any) => {
  //   if (
  //     previousPageData &&
  //     !previousPageData.findUsersBoughtPerformances.length
  //   ) {
  //     return null;
  //   }
  //   return getQueries.getUserBoughtPF(userData.id, 15, pageIndex * 15);
  // };
  // const {
  //   data,
  //   size: pageIndex,
  //   setSize: setPageIndex,
  // } = useSWRInfinite(getKey, fetcher, {
  //   onSuccess: (data) => {
  //     data.map((d) => {
  //       setPFList(
  //         PFList.concat(
  //           d.findUsersBoughtPerformances.map((fbp: any) => fbp.performance),
  //         ),
  //       );
  //     });
  //   },
  //   errorRetryCount: 3,
  //   revalidateAll: true,
  //   // persistSize: true,
  //   // revalidateOnFocus: false,
  // });

  const { data } = useSWR(getQueries.getUserBoughtPF(userData.id), fetcher);

  return (
    <>
      {data ? (
        <PFInfoListView
          title="펀딩 내역"
          handleClickBack={() => {
            router.back();
          }}
          pfData={data.findUsersBoughtPerformances.map(
            (d: any) => d.performance,
          )}
          // pageIndex={pageIndex}
          // setPageIndex={setPageIndex}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MYFundingPage;
