import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const FilledSm: Story = {
  args: {
    children: "Button",
    variant: "filled",
    size: "sm",
  },
};

export const FilledMd: Story = {
  args: {
    children: "Button",
    variant: "filled",
    size: "md",
  },
};

export const FilledLg: Story = {
  args: {
    children: "Button",
    variant: "filled",
    size: "lg",
  },
};

