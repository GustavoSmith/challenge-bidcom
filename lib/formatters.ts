const priceFormatter = new Intl.NumberFormat("es-AR", {
  currency: "USD",
  maximumFractionDigits: 2,
  style: "currency",
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function getOriginalPrice(
  price: number,
  discountPercentage?: number,
): number | undefined {
  if (
    !discountPercentage ||
    discountPercentage <= 0 ||
    discountPercentage >= 100
  ) {
    return undefined;
  }

  return price / (1 - discountPercentage / 100);
}
