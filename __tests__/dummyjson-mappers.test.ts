import { describe, expect, it } from "vitest";
import {
  mapCategory,
  mapProductDetail,
  mapProductSummary,
} from "@/lib/dummyjson";
import type { DummyJsonProduct } from "@/lib/dummyjson/types";

const dummyProduct: DummyJsonProduct = {
  id: 1,
  title: "Phone Max",
  description: "A solid phone",
  category: "smartphones",
  price: 999,
  discountPercentage: 10,
  rating: 4.5,
  stock: 12,
  tags: ["phone"],
  brand: "Acme",
  sku: "SKU-1",
  warrantyInformation: "1 year warranty",
  shippingInformation: "Ships tomorrow",
  availabilityStatus: "In Stock",
  thumbnail: "https://example.com/thumb.png",
  images: ["https://example.com/image.png"],
};

describe("DummyJSON mappers", () => {
  it("maps a product summary without leaking unused API fields", () => {
    expect(mapProductSummary(dummyProduct)).toEqual({
      id: 1,
      sku: "SKU-1",
      title: "Phone Max",
      price: 999,
      image: "https://example.com/thumb.png",
      category: "smartphones",
      brand: "Acme",
    });
  });

  it("maps a product detail with image fallback data", () => {
    expect(mapProductDetail({ ...dummyProduct, images: [] }).images).toEqual([
      "https://example.com/thumb.png",
    ]);
  });

  it("maps a category to the internal link contract", () => {
    expect(
      mapCategory({
        slug: "smartphones",
        name: "Smartphones",
        url: "https://dummyjson.com/products/category/smartphones",
      }),
    ).toEqual({
      slug: "smartphones",
      name: "Smartphones",
    });
  });
});
