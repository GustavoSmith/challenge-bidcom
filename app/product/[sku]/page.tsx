import Link from "next/link";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { buttonStyles } from "@/components/ui/button";
import { getProductBySku } from "@/lib/dummyjson/client";

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
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 px-4 py-12 text-center sm:px-6">
        <p className="text-sm font-black uppercase tracking-[0.1em] text-bidcom-blue">
          Producto no encontrado
        </p>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          No encontramos un producto con el SKU {sku}
        </h1>
        <p className="max-w-xl text-zinc-600">
          Podés volver al listado o probar con otro término de búsqueda.
        </p>
        <Link
          className={buttonStyles({ className: "mt-2 px-5 py-3" })}
          href="/"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:py-10">
      <Link
        className={buttonStyles({ className: "w-fit", variant: "secondary" })}
        href="/"
      >
        Volver al listado
      </Link>
      <ProductDetailView product={product} />
    </div>
  );
}
