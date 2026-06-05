import type {
  DummyJsonCategory,
  DummyJsonProduct,
  DummyJsonProductsResponse,
  ProductSearchResult,
} from "./types";

const DUMMYJSON_BASE_URL = "https://dummyjson.com";
const DEFAULT_REVALIDATE_SECONDS = 300;
const DEFAULT_PRODUCT_LIMIT = 20;

type NextFetchInit = NonNullable<Parameters<typeof fetch>[1]> & {
  next?: {
    revalidate?: number;
  };
};

async function fetchJson<TResponse>(
  path: string,
  init: NextFetchInit = {},
): Promise<TResponse> {
  const response = await fetch(`${DUMMYJSON_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init.headers,
    },
    next: {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      ...init.next,
    },
  });

  if (!response.ok) {
    throw new Error(`DummyJSON request failed: ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export async function searchProducts(
  query: string,
  limit = DEFAULT_PRODUCT_LIMIT,
): Promise<ProductSearchResult> {
  const normalizedQuery = query.trim();
  const params = new URLSearchParams({
    q: normalizedQuery,
    limit: String(limit),
  });
  const data = await fetchJson<DummyJsonProductsResponse>(
    `/products/search?${params.toString()}`,
  );

  return {
    products: data.products,
    total: data.total,
    skip: data.skip,
    limit: data.limit,
    query: normalizedQuery,
  };
}

export async function getCategories(limit = 5): Promise<DummyJsonCategory[]> {
  const categories = await fetchJson<DummyJsonCategory[]>(
    "/products/categories",
  );

  return categories.slice(0, limit);
}

// Como no existe un endpoint para obtener el id por sku, se obtiene el índice de productos y se busca el id del producto que coincide con el sku.
export async function getProductIdBySku(
  sku: string,
): Promise<number | undefined> {
  const data = await fetchJson<
    DummyJsonProductsResponse<Pick<DummyJsonProduct, "id" | "sku">>
  >("/products?limit=0&select=sku");
  const normalizedSku = sku.trim();
  const match = data.products.find((product) => {
    return product.sku === normalizedSku;
  });

  return match?.id;
}

export async function getProductById(id: number): Promise<DummyJsonProduct> {
  return fetchJson<DummyJsonProduct>(`/products/${id}`);
}

export async function getProductBySku(
  sku: string,
): Promise<DummyJsonProduct | undefined> {
  const id = await getProductIdBySku(sku);

  if (!id) {
    return undefined;
  }

  return getProductById(id);
}
