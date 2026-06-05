import Image from "next/image";
import { formatPrice, getOriginalPrice } from "@/lib/formatters";
import { DummyJsonProduct } from "@/lib/dummyjson/types";

type ProductDetailViewProps = {
  product: DummyJsonProduct;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const images = product.images?.length ? product.images : [product.thumbnail];
  const heroImage = images[0];
  const tags = product.tags ?? [];
  const originalPrice = getOriginalPrice(
    product.price,
    product.discountPercentage,
  );
  const discountLabel = product.discountPercentage
    ? `${Math.round(product.discountPercentage)}% OFF`
    : undefined;

  return (
    <article className="grid gap-8 rounded-[2rem] border border-border-soft bg-surface p-4 shadow-sm lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)] lg:p-8">
      <div className="relative flex min-h-[320px] items-center justify-center rounded-[1.5rem] bg-surface-muted p-6 lg:min-h-[520px]">
        {discountLabel ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-bidcom-sale px-4 py-2 text-sm font-black text-surface shadow-sm">
            {discountLabel}
          </span>
        ) : null}
        <Image
          alt={product.title}
          className="object-contain p-6"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={heroImage}
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="rounded-full bg-bidcom-blue-soft px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-bidcom-blue-ink">
              {product.category}
            </p>
            {product.brand ? (
              <p className="text-sm font-semibold text-zinc-600">
                {product.brand}
              </p>
            ) : null}
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-5 rounded-3xl bg-bidcom-blue px-5 py-4 text-surface">
            {originalPrice ? (
              <p className="text-sm font-semibold line-through opacity-80">
                {formatPrice(originalPrice)}
              </p>
            ) : null}
            <p className="text-4xl font-black tracking-tight">
              {formatPrice(product.price)}
            </p>
            {discountLabel ? (
              <p className="mt-1 text-sm font-bold text-bidcom-yellow">
                Ahorrás {discountLabel.toLowerCase()} sobre el precio de lista.
              </p>
            ) : null}
          </div>
        </div>

        <p className="max-w-[65ch] leading-7 text-zinc-700">
          {product.description}
        </p>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                className="rounded-full border border-border-soft bg-surface-muted px-3 py-1 text-sm font-semibold text-zinc-700"
                key={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <ProductMeta label="SKU" value={product.sku} />
          <ProductMeta label="Categoría" value={product.category} />
          <ProductMeta label="Stock" value={String(product.stock ?? "-")} />
          <ProductMeta
            label="Rating"
            value={product.rating ? `${product.rating}/5` : "-"}
          />
          <ProductMeta
            label="Disponibilidad"
            value={product.availabilityStatus ?? "-"}
          />
          <ProductMeta
            label="Envío"
            value={product.shippingInformation ?? "-"}
          />
          <ProductMeta
            label="Garantía"
            value={product.warrantyInformation ?? "-"}
          />
          <ProductMeta label="Devolución" value={product.returnPolicy ?? "-"} />
          <ProductMeta
            label="Compra mínima"
            value={
              product.minimumOrderQuantity
                ? String(product.minimumOrderQuantity)
                : "-"
            }
          />
        </dl>
      </div>
    </article>
  );
}

function ProductMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border-soft bg-surface-muted p-4">
      <dt className="font-bold uppercase tracking-[0.08em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-foreground">{value}</dd>
    </div>
  );
}
