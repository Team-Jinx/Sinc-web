import { ComponentStory, ComponentMeta } from "@storybook/react";
import Banner from ".";

export default {
  title: "components/organisms/Banner",
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
  // urls: [TodayArtist, TodayArtist, TodayArtist],
};
