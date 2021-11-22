import { ComponentStory, ComponentMeta } from "@storybook/react";
import Detail from ".";

export default {
  title: "components/templates/Detail",
  component: Detail,
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) => <Detail {...args} />;

export const Default = Template.bind({});
Default.args = {
  PFInfoData: {
    univName: "어디대학교 무슨팀이름",
    title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
    url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
    date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
    location: "플랫폼 창동61 레드박스",
  },
  FDInfoData: {
    soldTicket: 48,
    leftTicket: 48,
    percent: 50,
    leftPeriod: 50,
    totalPrice: 100000,
    likeNum: 111111,
  },
};
