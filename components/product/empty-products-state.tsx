import { DummyJsonCategory } from "@/lib/dummyjson/types";
import Link from "next/link";

type EmptyProductsStateProps = {
  categories: DummyJsonCategory[];
};

export function EmptyProductsState({ categories }: EmptyProductsStateProps) {
  return (
    <section className="rounded-[2rem] border border-dashed border-bidcom-blue/35 bg-surface p-6 text-center shadow-sm sm:p-8">
      <p className="text-sm font-black uppercase tracking-[0.1em] text-bidcom-blue">
        Sin resultados
      </p>
      <h2 className="mx-auto mt-2 max-w-2xl text-2xl font-black text-foreground">
        No se encontró ningún producto. Te recomendamos buscar estas categorías
      </h2>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const href = `/search?s=${encodeURIComponent(category.slug)}`;

          return (
            <Link
              className="rounded-full border border-border-soft bg-bidcom-blue-soft px-4 py-2 text-sm font-bold text-bidcom-blue-ink transition hover:border-bidcom-blue hover:bg-surface focus:outline-none focus:ring-4 focus:ring-bidcom-blue-soft"
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
