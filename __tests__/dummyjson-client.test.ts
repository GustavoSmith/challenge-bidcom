import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getCategories,
  getProductBySku,
  searchProducts,
} from "@/lib/dummyjson";

function mockFetchJson(...payloads: unknown[]) {
  const fetchMock = vi.fn();

  payloads.forEach((payload) => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => payload,
    });
  });

  vi.stubGlobal("fetch", fetchMock);

  return fetchMock;
}

describe("DummyJSON client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("searches products with a trimmed query and limit 20", async () => {
    const fetchMock = mockFetchJson({
      products: [
        {
          id: 1,
          sku: "ABC-1",
          title: "Phone",
          price: 100,
          thumbnail: "https://example.com/phone.png",
          category: "smartphones",
        },
      ],
      total: 1,
      skip: 0,
      limit: 20,
    });

    const result = await searchProducts(" phone ");

    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://dummyjson.com/products/search?q=phone&limit=20",
    );
    expect(result.products[0]).toMatchObject({
      sku: "ABC-1",
      title: "Phone",
      image: "https://example.com/phone.png",
    });
  });

  it("returns the first five mapped categories", async () => {
    mockFetchJson([
      { slug: "beauty", name: "Beauty", url: "https://example.com/beauty" },
      {
        slug: "fragrances",
        name: "Fragrances",
        url: "https://example.com/fragrances",
      },
    ]);

    await expect(getCategories(1)).resolves.toEqual([
      { slug: "beauty", name: "Beauty" },
    ]);
  });

  it("resolves a product detail by sku using the id lookup endpoint", async () => {
    const fetchMock = mockFetchJson(
      {
        products: [
          { id: 1, sku: "OTHER" },
          { id: 7, sku: "TARGET-SKU" },
        ],
        total: 2,
        skip: 0,
        limit: 0,
      },
      {
        id: 7,
        sku: "TARGET-SKU",
        title: "Target Product",
        description: "The product detail",
        category: "smartphones",
        price: 250,
        thumbnail: "https://example.com/detail.png",
        images: ["https://example.com/detail.png"],
      },
    );

    const product = await getProductBySku("TARGET-SKU");

    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://dummyjson.com/products?limit=0&select=sku",
    );
    expect(fetchMock.mock.calls[1][0]).toBe("https://dummyjson.com/products/7");
    expect(product).toMatchObject({
      id: 7,
      sku: "TARGET-SKU",
      title: "Target Product",
    });
  });

  it("does not request detail when the sku does not exist", async () => {
    const fetchMock = mockFetchJson({
      products: [{ id: 1, sku: "OTHER" }],
      total: 1,
      skip: 0,
      limit: 0,
    });

    await expect(getProductBySku("MISSING")).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
