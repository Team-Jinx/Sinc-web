import { ComponentStory, ComponentMeta } from "@storybook/react";
import Funding from ".";

export default {
  title: "components/templates/Funding",
  component: Funding,
} as ComponentMeta<typeof Funding>;

const Template: ComponentStory<typeof Funding> = (args) => (
  <Funding
  // {...args}
  />
);

export const Default = Template.bind({});
