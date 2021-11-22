import type { NextPage } from "next";
import { Main } from "src/components/templates";

const Home: NextPage = () => {
  return <Main PFInfoDataList={PFInfoDataList} PopDataList={PopDataList} />;
};

export default Home;

// mock data
const PFInfoDataList = [
  {
    pfNum: 1,
    univName: "어디대학교 무슨팀이름",
    title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
    url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
  },
  {
    pfNum: 2,
    univName: "어디대학교 무슨팀이름",
    title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
    url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
  },
  {
    pfNum: 3,
    univName: "어디대학교 무슨팀이름",
    title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
    url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
  },
];
const PopDataList = [
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
];
