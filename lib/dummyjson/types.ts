export type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  sku: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  thumbnail: string;
  images?: string[];
};

export type DummyJsonProductsResponse<TProduct = DummyJsonProduct> = {
  products: TProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type DummyJsonCategory = {
  slug: string;
  name: string;
  url: string;
};

export type ProductSummary = {
  id: number;
  sku: string;
  title: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
};

export type ProductDetail = ProductSummary & {
  description: string;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  images: string[];
};

export type ProductSearchResult = {
  products: ProductSummary[];
  total: number;
  skip: number;
  limit: number;
  query: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
};

export type ProductSkuIndexEntry = {
  id: number;
  sku: string;
};
