export function formatIDR(amount: number): string {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error("Failed to format IDR amount", error);
    return `Rp${Math.round(amount).toLocaleString("id-ID")}`;
  }
}
