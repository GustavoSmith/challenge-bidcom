import { EmptyProductsState } from "@/components/product/empty-products-state";
import { ProductGrid } from "@/components/product/product-grid";
import { getCategories, searchProducts } from "@/lib/dummyjson/client";

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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-10">
      <header className="rounded-[2rem] border border-border-soft bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.1em] text-bidcom-blue">
          Resultados de búsqueda
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
          {searchTerm ? `Resultados para "${searchTerm}"` : "Buscar productos"}
        </h1>
      </header>

      {result.products.length > 0 ? (
        <ProductGrid products={result.products} />
      ) : (
        <EmptyProductsState categories={categories} />
      )}
    </div>
  );
}
