import Image from "next/image";
import Link from "next/link";
import { formatPrice, getOriginalPrice } from "@/lib/formatters";
import { DummyJsonProduct } from "@/lib/dummyjson/types";

type ProductCardProps = {
  product: DummyJsonProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const originalPrice = getOriginalPrice(
    product.price,
    product.discountPercentage,
  );
  const hasDiscount = Boolean(product.discountPercentage);

  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-border-soft bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-bidcom-blue/40 hover:shadow-md">
      <Link
        aria-label={`Ver detalle de ${product.title}`}
        className="flex h-full flex-col outline-none focus-visible:ring-4 focus-visible:ring-bidcom-blue-soft"
        href={`/product/${encodeURIComponent(product.sku)}`}
      >
        <div className="relative flex aspect-square items-center justify-center bg-surface-muted p-5">
          {hasDiscount ? (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-bidcom-sale px-3 py-1 text-xs font-black text-surface shadow-sm">
              {Math.round(product.discountPercentage ?? 0)}% OFF
            </span>
          ) : null}
          <Image
            alt={product.title}
            className="object-contain p-5 transition duration-200 group-hover:scale-[1.03]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={product.thumbnail}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="rounded-full bg-bidcom-blue-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-bidcom-blue-ink">
              {product.category}
            </p>
            {product.rating ? (
              <p className="text-xs font-semibold text-zinc-600">
                {product.rating.toFixed(1)} / 5
              </p>
            ) : null}
          </div>
          <h2 className="line-clamp-2 text-base font-bold leading-6 text-foreground">
            {product.title}
          </h2>
          {product.brand ? (
            <p className="text-sm font-medium text-zinc-600">{product.brand}</p>
          ) : null}
          <div className="mt-auto flex flex-col gap-1">
            {originalPrice ? (
              <p className="text-sm font-medium text-zinc-500 line-through">
                {formatPrice(originalPrice)}
              </p>
            ) : null}
            <p className="text-2xl font-black tracking-tight text-bidcom-blue">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-zinc-600">
              {product.stock && product.stock > 0
                ? "Stock disponible"
                : "Consultar disponibilidad"}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
