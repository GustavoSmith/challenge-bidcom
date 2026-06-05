import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextInput } from "./text-input";

const meta = {
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  title: "Design System/Text Input",
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Búsqueda
        <TextInput name="search" placeholder="¿Qué estás buscando?" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Con valor inicial
        <TextInput defaultValue="smartphones" name="filled-search" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-bold text-foreground">
        Deshabilitado
        <TextInput disabled name="disabled-search" placeholder="Cargando..." />
      </label>
    </div>
  ),
};
