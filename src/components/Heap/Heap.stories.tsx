import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import Heap from "./Heap";

export default {
  title: "Components/Heap",
  component: Heap,
  args: {},
} as ComponentMeta<typeof Heap>;

const Template: ComponentStory<typeof Heap> = (args) => <Heap {...args} />;

export const Story = Template.bind({});
Story.args = {};
