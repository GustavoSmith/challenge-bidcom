import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatters";
import type { ProductSummary } from "@/lib/dummyjson";

type ProductCardProps = {
  product: ProductSummary;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        aria-label={`Ver detalle de ${product.title}`}
        className="flex h-full flex-col"
        href={`/product/${encodeURIComponent(product.sku)}`}
      >
        <div className="relative flex aspect-square items-center justify-center bg-zinc-50 p-4">
          <Image
            alt={product.title}
            className="object-contain p-4"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={product.image}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            {product.brand ?? product.category}
          </p>
          <h2 className="line-clamp-2 text-base font-semibold text-zinc-950">
            {product.title}
          </h2>
          <p className="mt-auto text-lg font-bold text-zinc-950">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
