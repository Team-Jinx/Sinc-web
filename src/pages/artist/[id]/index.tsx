import { NextPageContext } from "next";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { Artist, Loading } from "src/components/templates";
import { NoticeDataProps } from "src/interfaces/StoryData";
import states from "src/modules";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

interface ArtistPageProps {
  artistId: string;
}
const ArtistPage = ({ artistId }: ArtistPageProps) => {
  const userData = useRecoilValue(states.UserDataState);

  // 아티스트 데이터
  const { data: artistData } = useSWR(getQueries.getArtist(artistId), fetcher);

  // 업로드 영상 데이터
  const [notiList, setNotiList] = useState<NoticeDataProps[]>([]);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.findStories.length) {
      return null;
    }
    return getQueries.getNotice({
      artistId,
      userId: userData.id,
      type: "ADVERTISE",
      limit: 15,
      offset: pageIndex * 15,
    });
  };
  const {
    data,
    mutate,
    size: pageIndex,
    setSize: setPageIndex,
  } = useSWRInfinite(getKey, fetcher, {
    onSuccess: (data) => {
      data.map((d) => {
        setNotiList(notiList.concat(d.findStories));
      });
    },
    errorRetryCount: 3,
    revalidateAll: true,
    // persistSize: true,
    // revalidateOnFocus: false,
  });

  return (
    <>
      {artistData ? (
        <Artist
          artistData={artistData.findArtistById}
          NotiDatas={notiList}
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

// mock data
const mock_art = {
  agency: "서울예술대 실용음악과",
  id: "hihi",
  name: "동아리명",
  profileUrl:
    "https://sinc-storage.s3.ap-northeast-2.amazonaws.com/Rectangle+1095.svg",
  performances: [],
};
