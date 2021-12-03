import { NextPageContext } from "next";
import router from "next/router";
import { useState } from "react";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, PFInfoListView } from "src/components/templates";
import { PFInfoDataProps } from "src/interfaces/PFData";
import useSWRInfinite from "swr/infinite";

interface ArtistPageProps {
  artistId: string;
}
const ArtistPage = ({ artistId }: ArtistPageProps) => {
  // 업로드 영상 데이터
  const [PFList, setPFList] = useState<PFInfoDataProps[]>([]);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.findPerformances.length) {
      return null;
    }
    return getQueries.getArtistPF(artistId, 15, pageIndex * 15);
  };
  const {
    data,
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
          title="아티스트가 진행한 펀딩"
          handleClickBack={() => {
            router.back();
          }}
          pfData={PFList}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ArtistPage;

ArtistPage.getInitialProps = async (ctx: NextPageContext) => {
  const artistId = ctx.query.id;
  return { artistId };
};
