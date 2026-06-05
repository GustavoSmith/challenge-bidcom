import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import ProductPage from "@/app/product/[sku]/page";
import SearchPage from "@/app/search/page";
import type {
  DummyJsonCategory,
  DummyJsonProduct,
} from "@/lib/dummyjson/types";
import {
  getCategories,
  getProductBySku,
  searchProducts,
} from "@/lib/dummyjson/client";

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    priority: _priority,
    sizes: _sizes,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
  }) => <img {...props} />,
}));

vi.mock("@/lib/dummyjson/client", () => ({
  getCategories: vi.fn(),
  getProductBySku: vi.fn(),
  searchProducts: vi.fn(),
}));

const mockedSearchProducts = vi.mocked(searchProducts);
const mockedGetCategories = vi.mocked(getCategories);
const mockedGetProductBySku = vi.mocked(getProductBySku);

const products: DummyJsonProduct[] = [
  {
    id: 1,
    sku: "ESSENCE-MASCARA",
    title: "Essence Mascara Lash Princess",
    description: "Popular mascara",
    category: "beauty",
    price: 9.99,
    discountPercentage: 7,
    rating: 4.9,
    stock: 5,
    brand: "Essence",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
    ],
    tags: ["beauty", "mascara"],
    availabilityStatus: "In Stock",
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

describe("product pages integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the home listing from the search endpoint", async () => {
    mockedSearchProducts.mockResolvedValue({
      products,
      total: 1,
      skip: 0,
      limit: 20,
      query: "",
    });

    render(await Home());

    expect(mockedSearchProducts).toHaveBeenCalledWith("");
    expect(
      screen.getByRole("heading", { name: "Listado de productos" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", {
        name: "Ver detalle de Essence Mascara Lash Princess",
      }),
    ).toHaveAttribute("href", "/product/ESSENCE-MASCARA");
  });

  it("renders the empty search state with five category links", async () => {
    mockedSearchProducts.mockResolvedValue({
      products: [],
      total: 0,
      skip: 0,
      limit: 20,
      query: "sin-resultados",
    });
    mockedGetCategories.mockResolvedValue(categories);

    render(
      await SearchPage({
        searchParams: Promise.resolve({ s: " sin-resultados " }),
      }),
    );

    expect(mockedSearchProducts).toHaveBeenCalledWith("sin-resultados");
    expect(mockedGetCategories).toHaveBeenCalledWith(5);
    expect(
      screen.getByRole("heading", {
        name: /No se encontró ningún producto/i,
      }),
    ).toBeVisible();
    expect(screen.getAllByRole("link")).toHaveLength(5);
    expect(screen.getByRole("link", { name: "Beauty" })).toHaveAttribute(
      "href",
      "/search?s=beauty",
    );
  });

  it("renders a product detail by sku route params", async () => {
    mockedGetProductBySku.mockResolvedValue(products[0]);

    render(
      await ProductPage({
        params: Promise.resolve({ sku: "ESSENCE-MASCARA" }),
      }),
    );

    expect(mockedGetProductBySku).toHaveBeenCalledWith("ESSENCE-MASCARA");
    expect(
      screen.getByRole("heading", { name: "Essence Mascara Lash Princess" }),
    ).toBeVisible();
    expect(screen.getByText("ESSENCE-MASCARA")).toBeVisible();
    expect(screen.getByText("In Stock")).toBeVisible();
  });
});
