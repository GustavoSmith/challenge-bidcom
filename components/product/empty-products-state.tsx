import Link from "next/link";
import type { ProductCategory } from "@/lib/dummyjson";

type EmptyProductsStateProps = {
  categories: ProductCategory[];
};

export function EmptyProductsState({ categories }: EmptyProductsStateProps) {
  return (
    <section className="rounded-3xl border border-dashed border-zinc-300 bg-white p-6 text-center shadow-sm">
      <h2 className="text-xl font-semibold text-zinc-950">
        No se encontró ningún producto. Te recomendamos buscar estas categorías
      </h2>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const href = `/search?s=${encodeURIComponent(category.slug)}`;

          return (
            <Link
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
              href={href}
              key={category.slug}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
