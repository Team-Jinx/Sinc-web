import { useState } from "react";
import fetcher from "src/apis";
import { getQueries } from "src/apis/queries";
import { TodayArtist } from "src/assets/img";
import { Main } from "src/components/templates";
import { PfDataQueryProps } from "src/interfaces/PFData";
import useSWR from "swr";

const Home = () => {
  const [pfDataQuery, setPfDataQuery] = useState<PfDataQueryProps>({
    category: "MUSIC",
  });
  const { data: PFInfoDataList } = useSWR(
    getQueries.getAllPF(
      pfDataQuery.category,
      pfDataQuery.title,
      pfDataQuery.place,
    ),
    fetcher,
    {
      onSuccess: (data) => {
        // date -> string으로 형 변환
        console.log(data);
      },
    },
  );

  return (
    <Main
      isLoading={!PFInfoDataList}
      BannerData={BannerData}
      PFInfoDataList={PFInfoDataList?.findPerformances}
      PopDataList={PopDataList}
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
const BannerData = [TodayArtist, TodayArtist, TodayArtist];
// const PFInfoDataList = [
//   {
//     pfNum: 1,
//     univName: "어디대학교 무슨팀이름",
//     title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
//     url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
//     date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
//   },
//   {
//     pfNum: 2,
//     univName: "어디대학교 무슨팀이름",
//     title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
//     url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
//     date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
//   },
//   {
//     pfNum: 3,
//     univName: "어디대학교 무슨팀이름",
//     title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
//     url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
//     date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
//   },
// ];
const PopDataList = [
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
];
