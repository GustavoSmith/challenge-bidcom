import { ProductGrid } from "@/components/product/product-grid";
import { searchProducts } from "@/lib/dummyjson/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const result = await searchProducts("");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:py-10">
      <section className="overflow-hidden rounded-[2rem] border border-border-soft bg-surface shadow-sm">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.1em] text-bidcom-blue">
            Challenge Frontend Bidcom
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-foreground sm:text-5xl">
            Listado de productos con búsqueda y detalle por SKU.
          </h1>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.1em] text-bidcom-blue">
              Productos
            </p>
            <h2 className="mt-1 text-2xl font-black text-foreground">
              Listado de productos
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
