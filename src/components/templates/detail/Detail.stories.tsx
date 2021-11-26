import { ComponentStory, ComponentMeta } from "@storybook/react";
import Detail from ".";

export default {
  title: "components/templates/Detail",
  component: Detail,
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) => <Detail {...args} />;

export const Default = Template.bind({});
Default.args = {
  // PFInfoData: {
  //   univName: "어디대학교 무슨팀이름",
  //   title: "서울예대 공연학부 정기공연 <한여름 밤의 꿈>",
  //   url: "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  //   date: "9월 19일(목) ~ 9월 20일(금) / 9월 21일(토)",
  //   location: "플랫폼 창동61 레드박스",
  // },
  FDInfoData: {
    soldTicket: 48,
    leftTicket: 48,
    percent: 50,
    leftPeriod: 50,
    totalPrice: 100000,
    likeNum: 111111,
  },
  // runtime: 120,
  // ticketPrice: 10000,
  // startDate: "2021년 12월 10일(금)",
  // endDate: "12월 12일(일)",
  // startTime: "금 오후 8시 / 토, 일 오후 6시",
  // pfDesc: `서울예대 싱어송라이터 정기공연 합니다!!\n
  // 7명의 싱어송라이터들이 다양한 곡들을 준비했으니까\n
  // 시간 되실때 꼬옥 와주세용!💃🏼🕺🏻\n
  // ✔️인어공주를 좋아하시는 분들 꼬옥🥰🧜🏻‍♀️\n
  // ✔️현장예매보다 사전예매가 쌉니다💸\n
  // ✔️자세한 내용은 서울예대 싱어송라이터 전공 페이지를 확인해주세요🙏🏻\n
  // https://www.facebook.com/ullim13/\n
  // 🎤2019 울림 개봉박두🎤\n
  // 일시 : 2022. 07. 19. 금 19시\n
  // 장소 : 플랫폼 창동 61 레드박스\n
  // 공연문의 : 010-7936-1833`,
};
