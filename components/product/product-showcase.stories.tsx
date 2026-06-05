import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { DummyJsonCategory, DummyJsonProduct } from "@/lib/dummyjson/types";
import { EmptyProductsState } from "./empty-products-state";
import { ProductDetailView } from "./product-detail-view";
import { ProductGrid } from "./product-grid";

const products: DummyJsonProduct[] = [
  {
    id: 101,
    title: "Apple AirPods Max Silver",
    description:
      "Auriculares premium con cancelación activa de ruido y sonido espacial.",
    category: "mobile-accessories",
    price: 549.99,
    discountPercentage: 12.5,
    rating: 4.8,
    stock: 18,
    brand: "Apple",
    sku: "AAMX-SILVER",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp",
    ],
    tags: ["audio", "apple", "wireless"],
    warrantyInformation: "1 year warranty",
    shippingInformation: "Ships in 3-5 business days",
    availabilityStatus: "In Stock",
    returnPolicy: "30 days return policy",
    minimumOrderQuantity: 1,
  },
  {
    id: 102,
    title: "Apple iPhone Charger",
    description: "Cargador compacto compatible con iPhone.",
    category: "mobile-accessories",
    price: 19.99,
    rating: 4.4,
    stock: 64,
    brand: "Apple",
    sku: "IPH-CHARGER",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/1.webp",
    ],
    tags: ["charger", "apple"],
    availabilityStatus: "In Stock",
  },
  {
    id: 103,
    title: "Samsung Galaxy S10",
    description: "Smartphone Samsung con pantalla AMOLED.",
    category: "smartphones",
    price: 699.99,
    discountPercentage: 8,
    rating: 4.5,
    stock: 0,
    brand: "Samsung",
    sku: "SG-S10",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp",
    ],
    tags: ["phone", "android"],
    availabilityStatus: "Out of Stock",
  },
];

const categories: DummyJsonCategory[] = [
  { slug: "beauty", name: "Beauty", url: "https://dummyjson.com" },
  { slug: "fragrances", name: "Fragrances", url: "https://dummyjson.com" },
  { slug: "furniture", name: "Furniture", url: "https://dummyjson.com" },
  { slug: "groceries", name: "Groceries", url: "https://dummyjson.com" },
  {
    slug: "home-decoration",
    name: "Home Decoration",
    url: "https://dummyjson.com",
  },
];

const meta = {
  title: "Challenge/Product Experience",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductListing: Story = {
  render: () => <ProductGrid products={products} />,
};

export const EmptyResults: Story = {
  render: () => <EmptyProductsState categories={categories} />,
};

export const ProductDetail: Story = {
  render: () => <ProductDetailView product={products[0]} />,
};
