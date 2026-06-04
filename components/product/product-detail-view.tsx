import Image from "next/image";
import { formatPrice } from "@/lib/formatters";
import type { ProductDetail } from "@/lib/dummyjson";

type ProductDetailViewProps = {
  product: ProductDetail;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const heroImage = product.images[0] ?? product.image;

  return (
    <article className="grid gap-8 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:p-8">
      <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl bg-zinc-50 p-6 lg:min-h-[520px]">
        <Image
          alt={product.title}
          className="object-contain p-6"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={heroImage}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            {product.brand ?? product.category}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
            {product.title}
          </h1>
          <p className="mt-3 text-3xl font-black text-zinc-950">
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="leading-7 text-zinc-700">{product.description}</p>

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
        </dl>
      </div>
    </article>
  );
}

function ProductMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-zinc-50 p-4">
      <dt className="font-semibold text-zinc-500">{label}</dt>
      <dd className="mt-1 font-medium text-zinc-950">{value}</dd>
    </div>
  );
}
