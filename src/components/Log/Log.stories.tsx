import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import Log from "./Log";

export default {
  title: "Components/Log",
  component: Log,
  args: {},
} as ComponentMeta<typeof Log>;

const Template: ComponentStory<typeof Log> = (args) => <Log {...args} />;

export const Default = Template.bind({});
Default.args = {};
