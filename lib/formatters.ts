const priceFormatter = new Intl.NumberFormat("es-AR", {
  currency: "USD",
  maximumFractionDigits: 2,
  style: "currency",
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}
