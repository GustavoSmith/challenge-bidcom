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
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  reviews?: unknown[];
  meta?: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
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

export type ProductSearchResult = DummyJsonProductsResponse & {
  query: string;
};
