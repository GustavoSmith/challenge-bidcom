import { ProductGrid } from "@/components/product/product-grid";
import { searchProducts } from "@/lib/dummyjson";

export const dynamic = "force-dynamic";

export default async function Home() {
  const result = await searchProducts("");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:py-10">
      <section className="rounded-3xl bg-zinc-950 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Challenge Frontend Bidcom
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
          Encontrá productos destacados de DummyJSON
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
          Esta primera versión prioriza el flujo funcional: búsqueda, responsive
          y navegación al detalle por SKU.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950">
              Productos destacados
            </h2>
            <p className="text-sm text-zinc-600">
              Mostrando {result.products.length} de {result.total} productos.
            </p>
          </div>
        </div>
        <ProductGrid products={result.products} />
      </section>
    </div>
  );
}
