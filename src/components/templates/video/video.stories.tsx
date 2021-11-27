import { ComponentStory, ComponentMeta } from "@storybook/react";
import Video from ".";

export default {
  title: "components/templates/Video",
  component: Video,
} as ComponentMeta<typeof Video>;

const Template: ComponentStory<typeof Video> = (args) => <Video {...args} />;

export const Default = Template.bind({});
Default.args = {
  // url: "https://v16m.tiktokcdn.com/a9fab9833f838c38ef6bbbc0266fa0ad/619c3020/video/tos/alisg/tos-alisg-pve-0037/b0f2d2e0b5d342a8ad23d1dc86a43154/?a=1180&br=4178&bt=2089&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=3&ds=3&er=&ft=wZmOpFBrkag3-I&l=20211122180438010244075048207F2A6C&lr=tiktok&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amV0bjQ6ZjVvODMzODgzNEApOzUzNmU1ODxnNzk8aWY3ZWcwc3FucjRfMmhgLS1kLy1zczBjLjEvYF4xYy5iXmEyLTE6Yw%3D%3D&vl=&vr=",
  // univName: "서울예술대학교 실용음악과",
  // title: "싱어송라이터 전공 정기공연 <울림>",
  // // date: "3일전",
  // desc: "저희 열심히 공연 연습 중입니다~",
  // posterUrl:
  //   "https://news.seoul.go.kr/welfare/files/2021/03/605a97eaac0d83.01878886.png",
  // likeNum: "11k",
};
