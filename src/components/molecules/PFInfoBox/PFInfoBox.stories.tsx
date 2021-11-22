import { ComponentStory, ComponentMeta } from "@storybook/react";
import PFInfoBox from ".";

export default {
  title: "components/molecules/PFInfoBox",
  component: PFInfoBox,
} as ComponentMeta<typeof PFInfoBox>;

const Template: ComponentStory<typeof PFInfoBox> = (args) => (
  <PFInfoBox {...args} />
);

export const ListInfo = Template.bind({});
ListInfo.args = {
  type: "list",
  pfNum: 1,
  univName: "어디대학교 무슨팀이름",
  title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
  url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
};

export const DetailInfo = Template.bind({});
DetailInfo.args = {
  type: "detail",
  univName: "서울예술대학교 실용음악과",
  title: "싱어송라이터 전공 정기공연 <울림>",
  url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  date: "7월 19일(일)",
  location: "플랫폼 창동61 레드박스",
};
