import { ComponentStory, ComponentMeta } from "@storybook/react";
import Funding from ".";

export default {
  title: "components/templates/Funding",
  component: Funding,
} as ComponentMeta<typeof Funding>;

const Template: ComponentStory<typeof Funding> = (args) => (
  <Funding {...args} />
);

export const Default = Template.bind({});
Default.args = {
  FDInfoData: {
    date: "9월 12일(일)",
    endDate: "9월 20일(월)",
    state: "완료",
    ticketNum: 1,
    additionSup: 5000,
    totalPrice: 10000,
  },
  PFInfoData: {
    title: "공연 이름",
    artist: "아티스트 이름",
    ticketPrice: 5000,
    startDate: "9월 19일(목)",
    endDate: "9월 21일(토)",
    location: "플랫폼 창동61 레드박스",
    runtime: 120,
  },
  timeList: ["23:00", "21:00"],
};
