import { useEffect, useState } from "react";
import fetcher, { getRefreshToken, setGraphQLClient } from "src/apis";
import { getQueries } from "src/apis/queries";
import { Loading, Main } from "src/components/templates";
import { PfDataQueryProps } from "src/interfaces/PFData";
import useSWR from "swr";
// import cookies from "next-cookies";
import cookie from "react-cookies";
import { useRecoilValue } from "recoil";
import states from "src/modules";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const handleLogin = async () => {
      // 토큰
      const userToken = cookie.load("access-token");

      // 로그인 되어있을 경우
      if (userToken !== undefined) {
        // try {
        await setGraphQLClient(userToken);
        await getRefreshToken();
        // await fetcher(getQueries.getUserData());
        // } catch (e) {
        //   // 1일 마다 refresh token 발급

        // }
      }
      // 로그인 안 된 경우
      // 로그인 페이지로 이동
      else {
        router.push("/login");
      }
    };

    handleLogin();
  }, []);

  const [pfDataQuery, setPfDataQuery] = useState<PfDataQueryProps>({
    category: "MUSIC",
  });
  const userData = useRecoilValue(states.UserDataState);
  // const { data: PFInfoDataList } = useSWR(getQueries.getPopPF(), fetcher, {
  //   onSuccess: (data) => {
  //     // date -> string으로 형 변환
  //     console.log(data);
  //   },
  // });
  const { data: PopStories } = useSWR(
    getQueries.getPopStories({ limit: 10, offset: 0, userId: userData.id }),
    fetcher,
  );

  const { data: BannerData } = useSWR(getQueries.getHotPF(), fetcher);

  const { data: ArtistData } = useSWR(getQueries.getTwoArtist(), fetcher);

  return (
    <>
      {BannerData && ArtistData ? (
        <Main
          BannerData={BannerData.findPerformancesByPercentage}
          ArtistData={ArtistData.findTwoArtists}
          PopDataList={PopStories?.findPopularStories}
          setCategory={(e) =>
            setPfDataQuery({
              ...pfDataQuery,
              category: e,
            })
          }
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;

// Home.getInitialProps = async (ctx: NextPageContext) => {
//   // 토큰
//   const allCookies = cookies(ctx);
//   const userToken = allCookies["access-token"];

//   // 로그인 되어있을 경우
//   if (userToken !== undefined) {
//     try {
//       await setGraphQLClient(userToken);
//       await fetcher(getQueries.getUserData());
//     } catch (e) {
//       // 1일 마다 refresh token 발급
//       await getRefreshToken();
//     }
//   }
//   // 로그인 안 된 경우
//   // 로그인 페이지로 이동
//   else {
//     ctx.res?.writeHead(307, { Location: "/login" });
//     ctx.res?.end();
//   }
//   return {};
// };

//mock data
const data = [
  {
    agency: "서울예술대학교 실용음악과",
    id: "문자열",
    name: "",
    profileUrl:
      "https://lh3.googleusercontent.com/proxy/nzbQMZ4EF34a6_j6iB_LHV-dt-UETEX7yKi-KPIop_mBe1HYU4zKm0h1jrpWwb-PKm1SU3t5bVUEOfbqcxHUAIvvjZ_HImN1gp00bYm6e70lrWa8E04",
    _count: {
      performances: 4,
    },
    performance: [{ title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>" }],
  },
  {
    agency: "서울예술대학교 실용음악과",
    id: "문자열",
    name: "",
    profileUrl:
      "https://lh3.googleusercontent.com/proxy/nzbQMZ4EF34a6_j6iB_LHV-dt-UETEX7yKi-KPIop_mBe1HYU4zKm0h1jrpWwb-PKm1SU3t5bVUEOfbqcxHUAIvvjZ_HImN1gp00bYm6e70lrWa8E04",
    _count: {
      performances: 4,
    },
    performance: [{ title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>" }],
  },
];
