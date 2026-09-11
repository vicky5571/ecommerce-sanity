import { formatIDR } from "@/lib/formatIDR";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/imageUrl";
import {
  PackageOpen,
  ShoppingBag,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Tag,
  Calendar,
} from "lucide-react";
import { OrderTrackingCard } from "@/components/OrderTrackingCard";


async function Orders() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-16">
        {/* Page Title Header */}
        <div className="pb-4 mb-6 border-b border-stone-200">
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Daftar Transaksi
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Riwayat pembelian dan status pesanan Anda
          </p>
        </div>

        {/* 1. Rich Empty State */}
        {orders.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mx-auto shadow-sm">
              <PackageOpen className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Belum ada riwayat pesanan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Semua pesanan yang Anda lakukan akan tercatat rapi di halaman
                ini.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold text-sm transition-all shadow-md shadow-sky-500/25 hover:scale-[1.02]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Mulai Belanja Sekarang</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order: any) => {
              const formattedDate = order.orderDate
                ? new Date(order.orderDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A";

              return (
                <div
                  key={order.orderNumber}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#BAE6FD]/80 shadow-xs space-y-4 transition-all hover:border-[#38BDF8]"
                >
                  {/* Order Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded-md bg-sky-50 text-[#0284C7]">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-bold text-slate-900">Belanja</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {formattedDate}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400 font-mono text-[11px] truncate max-w-[120px] sm:max-w-none">
                        No. {order.orderNumber}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-1.5">
                      {order.status === "paid" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Selesai / Paid</span>
                        </span>
                      ) : (
                        <span className="px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                          {order.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* List of Ordered Items */}
                  <div className="space-y-3">
                    {order.products?.map((productItem: any) => {
                      const prod = productItem.product;
                      const itemTotal =
                        (prod?.price ?? 0) * (productItem.quantity ?? 1);

                      return (
                        <div
                          key={productItem._key || prod?._id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2"
                        >
                          <div className="flex items-center gap-3.5 flex-1 min-w-0">
                            <div className="w-16 h-16 rounded-xl bg-sky-50/40 p-2 border border-[#BAE6FD]/60 shrink-0 relative overflow-hidden">
                              {prod?.image && (
                                <Image
                                  src={imageUrl(prod.image).url()}
                                  alt={prod.name ?? "Product image"}
                                  fill
                                  className="object-contain"
                                />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-sm text-slate-900 truncate">
                                {prod?.name ?? "Produk"}
                              </p>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">
                                {productItem.quantity} barang ×{" "}
                                {formatIDR(prod?.price ?? 0)}
                              </p>
                            </div>
                          </div>

                          {/* Price & Re-order "Beli Lagi" Action */}
                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-19 sm:pl-0">
                            <span className="font-mono font-bold text-sm text-slate-900">
                              {formatIDR(itemTotal)}
                            </span>

                            {prod?.slug?.current && (
                              <Link
                                href={`/product/${prod.slug.current}`}
                                className="px-3.5 py-1.5 rounded-full border border-[#0284C7] text-[#0284C7] hover:bg-[#E0F2FE] text-xs font-bold transition-colors"
                              >
                                Beli Lagi
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Discount Applied Callout (if present) */}
                  {order.amountDiscount ? (
                    <div className="p-3 rounded-xl bg-[#E0F2FE]/60 border border-[#BAE6FD]/60 flex items-center justify-between text-xs text-[#0284C7] font-medium">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Diskon Kupon Promo</span>
                      </span>
                      <span className="font-mono font-bold">
                        - {formatIDR(order.amountDiscount)}
                      </span>
                    </div>
                  ) : null}

                  {/* Delivery & Tracking Information Card */}
                  <OrderTrackingCard
                    status={order.status}
                    orderDate={order.orderDate}
                    shippingCourier={order.shippingCourier}
                    shippingService={order.shippingService}
                    shippingCost={order.shippingCost}
                    trackingNumber={order.trackingNumber}
                    etd={order.etd}
                    shippingAddress={order.shippingAddress}
                  />

                  {/* Total Tagihan Footer */}
                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    {order.shippingCost ? (
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span>Ongkos Kirim ({order.shippingCourier || "Kurir"} {order.shippingService || ""})</span>
                        <span className="font-mono text-stone-700">{formatIDR(order.shippingCost)}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-stone-500 font-medium">
                        Total Pembayaran
                      </span>
                      <div className="text-right">
                        <span className="text-base font-mono font-extrabold text-stone-950">
                          {formatIDR(order.totalPrice ?? 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
