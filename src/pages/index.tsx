import { useState } from "react";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { TodayArtist, TodayArtist2, TodayArtist3 } from "src/assets/img";
import { Main } from "src/components/templates";
import { PfDataQueryProps } from "src/interfaces/PFData";
import useSWR from "swr";

const Home = () => {
  const [pfDataQuery, setPfDataQuery] = useState<PfDataQueryProps>({
    category: "MUSIC",
  });
  const { data: PFInfoDataList } = useSWR(
    getQueries.getPopPF(pfDataQuery.category),
    fetcher,
    {
      onSuccess: (data) => {
        // date -> string으로 형 변환
        console.log(data);
      },
    },
  );
  const { data: PopStories } = useSWR(getQueries.getPopStories(10, 0), fetcher);

  return (
    <Main
      isLoading={!PFInfoDataList}
      BannerData={BannerData}
      PFInfoDataList={PFInfoDataList?.findPopularPerformances}
      PopDataList={PopStories?.findPopularStories}
      setCategory={(e) =>
        setPfDataQuery({
          ...pfDataQuery,
          category: e,
        })
      }
    />
  );
};

export default Home;

// mock data
const BannerData = [
  {
    url: TodayArtist,
    name: "징스 Jinx",
    agency: "호원대학교 실용음악학부",
  },
  {
    url: TodayArtist2,
    name: "후킹 hooking",
    agency: "중앙대학교 댄스동아리",
  },
  {
    url: TodayArtist3,
    name: "넥스트 NEXT",
    agency: "서울 대학 연합 동아리",
  },
];
