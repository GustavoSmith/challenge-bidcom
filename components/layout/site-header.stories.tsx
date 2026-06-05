import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteHeader } from "./site-header";

const meta = {
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
  },
  title: "Challenge/Site Header",
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600 sm:px-6">
        El header conserva el logo como link a home y el buscador hacia
        /search?s=termino.
      </main>
    </div>
  ),
};
