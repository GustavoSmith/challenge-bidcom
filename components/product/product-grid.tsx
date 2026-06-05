import { DummyJsonProduct } from "@/lib/dummyjson/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: DummyJsonProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
      {products.map((product) => (
        <ProductCard key={product.sku} product={product} />
      ))}
    </div>
  );
}
