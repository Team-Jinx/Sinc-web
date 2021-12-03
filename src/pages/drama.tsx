import router from "next/router";
import { useState } from "react";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, PFInfoListView } from "src/components/templates";
import { PFInfoDataProps } from "src/interfaces/PFData";
import useSWRInfinite from "swr/infinite";

const DramaPFPage = () => {
  const [PFList, setPFList] = useState<PFInfoDataProps[]>([]);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.findPerformances.length) {
      return null;
    }
    return getQueries.getAllPF("ACTING", 15, pageIndex * 15);
  };
  const {
    data,
    mutate,
    size: pageIndex,
    setSize: setPageIndex,
  } = useSWRInfinite(getKey, fetcher, {
    onSuccess: (data) => {
      data.map((d) => {
        setPFList(PFList.concat(d.findPerformances));
      });
    },
    errorRetryCount: 3,
    revalidateAll: true,
    // persistSize: true,
    // revalidateOnFocus: false,
  });

  return (
    <>
      {data ? (
        <PFInfoListView
          title="극"
          handleClickBack={() => {
            router.back();
          }}
          pfData={PFList}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          type="category"
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DramaPFPage;
