import { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectExam: Story = {
  args: {
    options:["Free shipping", "Standard shipping", "Express shipping"],
    placeholder: "Shipping cost"
  },
};
