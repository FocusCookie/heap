import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import Heap from "./Heap";

export default {
  title: "Components/Heap",
  component: Heap,
  args: {},
} as ComponentMeta<typeof Heap>;

const Template: ComponentStory<typeof Heap> = (args) => <Heap {...args} />;

const leveledHeap: any = [
  [
    {
      level: 0,
      value: 100,
      id: "ID_2323220641330000",
    },
  ],
  [
    {
      level: 1,
      value: 90,
      id: "ID_1432436259315000",
    },
    {
      level: 1,
      value: 80,
      id: "ID_1525864789248000",
    },
  ],
  [
    {
      level: 2,
      value: 55,
      id: "ID_1154972601501000",
    },
    {
      level: 2,
      value: 44,
      id: "ID_1182309457598000",
    },
  ],
];

export const Story = Template.bind({});
Story.args = {};

export const WithNodes = Template.bind({});
WithNodes.args = {
  leveledHeap: leveledHeap,
};
