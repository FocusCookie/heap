import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import ConsoleLog from "./ConsoleLog";

export default {
  title: "Components/ConsoleLog",
  component: ConsoleLog,
  args: {
    value: "string",
  },
} as ComponentMeta<typeof ConsoleLog>;

const Template: ComponentStory<typeof ConsoleLog> = (args) => (
  <ConsoleLog {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const CustomValue = Template.bind({});
CustomValue.args = {
  value: "hello world",
};
