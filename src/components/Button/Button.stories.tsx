import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "default",
};

export const Primary = Template.bind({});
Primary.args = {
  label: "primary",
  variant: "primary",
};

export const Subtle = Template.bind({});
Subtle.args = {
  label: "subtle",
  variant: "subtle",
};
