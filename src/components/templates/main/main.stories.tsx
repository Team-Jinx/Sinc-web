import { ComponentStory, ComponentMeta } from "@storybook/react";
import Main from ".";

export default {
  title: "components/templates/Main",
  component: Main,
} as ComponentMeta<typeof Main>;

const Template: ComponentStory<typeof Main> = (args) => <Main {...args} />;

export const Default = Template.bind({});
Default.args = {
  // PFInfoDataList: [
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
  // ],
  PopDataList: [
    "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  ],
};
