import type {
  DummyJsonCategory,
  DummyJsonProduct,
  ProductCategory,
  ProductDetail,
  ProductSkuIndexEntry,
  ProductSummary,
} from "./types";

export function mapProductSummary(product: DummyJsonProduct): ProductSummary {
  return {
    id: product.id,
    sku: product.sku,
    title: product.title,
    price: product.price,
    image: product.thumbnail,
    category: product.category,
    brand: product.brand,
  };
}

export function mapProductDetail(product: DummyJsonProduct): ProductDetail {
  return {
    ...mapProductSummary(product),
    description: product.description,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    tags: product.tags ?? [],
    warrantyInformation: product.warrantyInformation,
    shippingInformation: product.shippingInformation,
    availabilityStatus: product.availabilityStatus,
    images: product.images?.length ? product.images : [product.thumbnail],
  };
}

export function mapCategory(category: DummyJsonCategory): ProductCategory {
  return {
    slug: category.slug,
    name: category.name,
  };
}

export function mapSkuIndexEntry(
  product: ProductSkuIndexEntry,
): ProductSkuIndexEntry {
  return {
    id: product.id,
    sku: product.sku,
  };
}
