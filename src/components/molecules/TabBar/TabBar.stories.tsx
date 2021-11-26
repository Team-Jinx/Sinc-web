import { ComponentStory, ComponentMeta } from "@storybook/react";
import TabBar from ".";

export default {
  title: "components/molecules/TabBar",
  component: TabBar,
} as ComponentMeta<typeof TabBar>;

const Template: ComponentStory<typeof TabBar> = () => <TabBar />;

export const Default = Template.bind({});
