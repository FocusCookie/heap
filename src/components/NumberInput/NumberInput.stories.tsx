import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import NumberInput from "./NumberInput";

export default {
  title: "Components/NumberInput",
  component: NumberInput,
  args: {
    label: "LABEL",
    name: "name",
    id: "id",
    value: "123",
    onChange: undefined,
    disabled: false,
  },
} as ComponentMeta<typeof NumberInput>;

const Template: ComponentStory<typeof NumberInput> = (args) => (
  <NumberInput {...args} />
);

export const Story = Template.bind({});
Story.args = {};
