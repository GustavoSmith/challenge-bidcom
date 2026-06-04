import Link from "next/link";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { getProductBySku } from "@/lib/dummyjson";

type ProductPageProps = {
  params: Promise<{
    sku: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { sku } = await params;
  const product = await getProductBySku(sku);

  if (!product) {
    return (
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-12 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Producto no encontrado
        </p>
        <h1 className="text-3xl font-black tracking-tight text-zinc-950">
          No encontramos un producto con el SKU {sku}
        </h1>
        <p className="text-zinc-600">
          Podés volver al listado o probar con otro término de búsqueda.
        </p>
        <Link
          className="mx-auto mt-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          href="/"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:py-10">
      <Link
        className="text-sm font-semibold text-zinc-600 hover:text-zinc-950"
        href="/"
      >
        Volver al listado
      </Link>
      <ProductDetailView product={product} />
    </div>
  );
}
