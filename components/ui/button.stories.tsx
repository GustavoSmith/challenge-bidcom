import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Design System/Button",
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Buscar</Button>
      <Button variant="secondary">Volver al listado</Button>
      <Button variant="category">Beauty</Button>
      <Button disabled>Deshabilitado</Button>
    </div>
  ),
};
