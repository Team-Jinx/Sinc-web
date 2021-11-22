import { ComponentStory, ComponentMeta } from "@storybook/react";
import FDInfoBox from ".";

export default {
  title: "components/molecules/FDInfoBox",
  component: FDInfoBox,
} as ComponentMeta<typeof FDInfoBox>;

const Template: ComponentStory<typeof FDInfoBox> = (args) => (
  <FDInfoBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  soldTicket: 48,
  leftTicket: 48,
  percent: 50,
  leftPeriod: 50,
  totalPrice: 100000,
  likeNum: 111111,
};
