import { render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { EmptyProductsState } from "@/components/product/empty-products-state";
import { ProductCard } from "@/components/product/product-card";

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    sizes: _sizes,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    sizes?: string;
  }) => <img {...props} />,
}));

describe("product components", () => {
  it("renders a product card with image, name, price and sku link", () => {
    render(
      <ProductCard
        product={{
          id: 1,
          sku: "SKU-1",
          title: "Phone Max",
          price: 100,
          image: "https://cdn.dummyjson.com/product-images/phone.png",
          category: "smartphones",
          brand: "Acme",
        }}
      />,
    );

    expect(screen.getByRole("img", { name: "Phone Max" })).toHaveAttribute(
      "src",
      "https://cdn.dummyjson.com/product-images/phone.png",
    );
    expect(screen.getByRole("heading", { name: "Phone Max" })).toBeVisible();
    expect(screen.getByText(/100/)).toBeVisible();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/SKU-1");
  });

  it("renders the empty state with category search links", () => {
    render(
      <EmptyProductsState
        categories={[
          { slug: "beauty", name: "Beauty" },
          { slug: "smartphones", name: "Smartphones" },
        ]}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: /No se encontró ningún producto/i,
      }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Beauty" })).toHaveAttribute(
      "href",
      "/search?s=beauty",
    );
  });
});
