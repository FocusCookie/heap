import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import Node from "./Node";

export default {
  title: "Components/Node",
  component: Node,
  args: {},
} as ComponentMeta<typeof Node>;

const Template: ComponentStory<typeof Node> = (args) => <Node {...args} />;

export const Story = Template.bind({});
Story.args = { variant: "normal" };
