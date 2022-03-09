import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import Codebox from "./Codebox";

export default {
  title: "Components/Codebox",
  component: Codebox,
  args: {},
} as ComponentMeta<typeof Codebox>;

const Template: ComponentStory<typeof Codebox> = (args) => (
  <Codebox {...args}>
    <p>first line</p>
    <p>sec line</p>
    <p>third line</p>
  </Codebox>
);

export const Default = Template.bind({});
Default.args = {};
