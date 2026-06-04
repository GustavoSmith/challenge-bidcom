import { EmptyProductsState } from "@/components/product/empty-products-state";
import { ProductGrid } from "@/components/product/product-grid";
import { getCategories, searchProducts } from "@/lib/dummyjson";

type SearchPageProps = {
  searchParams: Promise<{
    s?: string | string[];
  }>;
};

function getSearchTerm(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { s } = await searchParams;
  const searchTerm = getSearchTerm(s);
  const result = await searchProducts(searchTerm);
  const categories = result.products.length === 0 ? await getCategories(5) : [];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Resultados de búsqueda
        </p>
        <h1 className="text-3xl font-black tracking-tight text-zinc-950">
          {searchTerm ? `Resultados para "${searchTerm}"` : "Buscar productos"}
        </h1>
        <p className="text-sm text-zinc-600">
          {result.products.length > 0
            ? `Mostrando ${result.products.length} de ${result.total} productos.`
            : "Probá con otro término o elegí una categoría recomendada."}
        </p>
      </header>

      {result.products.length > 0 ? (
        <ProductGrid products={result.products} />
      ) : (
        <EmptyProductsState categories={categories} />
      )}
    </div>
  );
}
