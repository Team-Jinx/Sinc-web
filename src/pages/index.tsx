import { AppContext } from "next/app";
import { useState } from "react";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { TodayArtist, TodayArtist2, TodayArtist3 } from "src/assets/img";
import { Main } from "src/components/templates";
import { PfDataQueryProps } from "src/interfaces/PFData";
import { BannerDataType } from "src/interfaces/types";
import useSWR from "swr";
import cookies from "next-cookies";
import { NextPageContext } from "next";

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

Home.getInitialProps = async (ctx: NextPageContext) => {
  // 토큰
  const allCookies = cookies(ctx);
  const userToken = allCookies["access-token"];

  // 로그인 되어있을 경우
  if (userToken !== undefined) {
    try {
      const res = await fetcher(getQueries.getUserData());
    } catch {
      // 1일 마다 refresh token 발급
      await fetcher(getQueries.getRefreshToken());
    }
  }
  // 로그인 안 된 경우
  // 로그인 페이지로 이동
  else {
    ctx.res?.writeHead(307, { Location: "/login" });
    ctx.res?.end();
  }
  return {};
};

// mock data
const BannerData: BannerDataType[] = [
  {
    url: TodayArtist.src,
    name: "징스 Jinx",
    agency: "호원대학교 실용음악학부",
  },
  {
    url: TodayArtist2.src,
    name: "후킹 hooking",
    agency: "중앙대학교 댄스동아리",
  },
  {
    url: TodayArtist3.src,
    name: "넥스트 NEXT",
    agency: "서울 대학 연합 동아리",
  },
];
