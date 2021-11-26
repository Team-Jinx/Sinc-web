import { ComponentStory, ComponentMeta } from "@storybook/react";
import PFNotiModal from ".";

export default {
  title: "components/organisms/PFNotiModal",
  component: PFNotiModal,
} as ComponentMeta<typeof PFNotiModal>;

const Template: ComponentStory<typeof PFNotiModal> = (args) => (
  <PFNotiModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  pfDate: "9월 19일(목) 오후 6시",
  pfTitle: "제24회 정기공연 뮤지컬 <경성광인>",
};
