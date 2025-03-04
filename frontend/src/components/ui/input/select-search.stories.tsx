import { Meta, StoryObj } from "@storybook/react";
import { SelectSearch } from "./select-search";

const meta = {
  component: SelectSearch,
} satisfies Meta<typeof SelectSearch>;

export default meta;
type Story = StoryObj<typeof SelectSearch>;

export const SelectExam: Story = {
  args: {
    options:["Free shipping", "Standard shipping", "Express shipping"],
    placeholder: "Sheller"
  },
};
