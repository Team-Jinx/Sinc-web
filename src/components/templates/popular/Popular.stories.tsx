import { ComponentStory, ComponentMeta } from "@storybook/react";
import Popular from ".";

export default {
  title: "components/templates/Popular",
  component: Popular,
} as ComponentMeta<typeof Popular>;

const Template: ComponentStory<typeof Popular> = (args) => (
  <Popular {...args} />
);

export const Default = Template.bind({});
Default.args = {
  NotiDatas: [],
};
