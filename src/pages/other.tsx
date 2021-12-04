import router from "next/router";
// import { useState } from "react";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, PFInfoListView } from "src/components/templates";
// import { PFInfoDataProps } from "src/interfaces/PFData";
import useSWR from "swr";
// import useSWRInfinite from "swr/infinite";

const DancePFPage = () => {
  // const [PFList, setPFList] = useState<PFInfoDataProps[]>([]);
  // const getKey = (pageIndex: number, previousPageData: any) => {
  //   if (previousPageData && !previousPageData.findPerformances.length) {
  //     return null;
  //   }
  //   return getQueries.getAllPF({
  //     category: "OTHER",
  //     limit: 15,
  //     offset: pageIndex * 15,
  //   });
  // };
  // const {
  //   data,
  //   size: pageIndex,
  //   setSize: setPageIndex,
  // } = useSWRInfinite(getKey, fetcher, {
  //   onSuccess: (data) => {
  //     data.map((d) => {
  //       setPFList(PFList.concat(d.findPerformances));
  //     });
  //   },
  //   errorRetryCount: 3,
  //   revalidateAll: true,
  //   // persistSize: true,
  //   // revalidateOnFocus: false,
  // });

  const { data } = useSWR(
    getQueries.getAllPF({
      category: "OTHER",
      // limit: 15,
      // offset: pageIndex * 15,
    }),
    fetcher,
  );

  return (
    <>
      {data ? (
        <PFInfoListView
          title="그 외"
          handleClickBack={() => {
            router.back();
          }}
          pfData={data.findPerformances}
          // pageIndex={pageIndex}
          // setPageIndex={setPageIndex}
          type="category"
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DancePFPage;
