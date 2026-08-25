import { formatIDR } from "@/lib/formatIDR";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/imageUrl";
import { PackageOpen, ShoppingBag, ArrowRight, RotateCcw, CheckCircle2, Tag, Calendar } from "lucide-react";

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
          <div className="py-16 text-center max-w-md mx-auto p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E8F8EA] text-[#03AC0E] flex items-center justify-center mx-auto">
              <PackageOpen className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Belum ada riwayat pesanan</h2>
              <p className="text-xs text-stone-500 mt-1">
                Semua pesanan yang Anda lakukan akan tercatat rapi di halaman ini.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white font-bold text-sm transition-colors shadow-sm"
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
                  className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-4 transition-all"
                >
                  {/* Order Card Header (Tokopedia Style) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1 rounded bg-stone-100 text-stone-600">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-bold text-stone-900">Belanja</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-500 flex items-center gap-1 font-mono text-[11px]">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {formattedDate}
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-stone-400 font-mono text-[11px] truncate max-w-[120px] sm:max-w-none">
                        No. {order.orderNumber}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-1.5">
                      {order.status === "paid" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F8EA] text-[#03AC0E] border border-[#B2E5B5] font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Selesai / Paid</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 font-bold text-[11px]">
                          {order.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* List of Ordered Items */}
                  <div className="space-y-3">
                    {order.products?.map((productItem: any) => {
                      const prod = productItem.product;
                      const itemTotal = (prod?.price ?? 0) * (productItem.quantity ?? 1);

                      return (
                        <div
                          key={productItem._key || prod?._id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2"
                        >
                          <div className="flex items-center gap-3.5 flex-1 min-w-0">
                            <div className="w-16 h-16 rounded-lg bg-stone-50 p-2 border border-stone-100 shrink-0 relative overflow-hidden">
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
                              <p className="font-bold text-sm text-stone-900 truncate">
                                {prod?.name ?? "Produk"}
                              </p>
                              <p className="text-xs text-stone-500 font-mono mt-0.5">
                                {productItem.quantity} barang × {formatIDR(prod?.price ?? 0)}
                              </p>
                            </div>
                          </div>

                          {/* Price & Re-order "Beli Lagi" Action */}
                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-19 sm:pl-0">
                            <span className="font-mono font-bold text-sm text-stone-900">
                              {formatIDR(itemTotal)}
                            </span>

                            {prod?.slug?.current && (
                              <Link
                                href={`/product/${prod.slug.current}`}
                                className="px-3 py-1.5 rounded-lg border border-[#03AC0E] text-[#03AC0E] hover:bg-[#E8F8EA] text-xs font-bold transition-colors"
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
                    <div className="p-3 rounded-lg bg-[#E8F8EA]/60 border border-[#B2E5B5]/60 flex items-center justify-between text-xs text-[#03AC0E] font-medium">
                      <span className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Diskon Kupon Promo</span>
                      </span>
                      <span className="font-mono font-bold">
                        - {formatIDR(order.amountDiscount)}
                      </span>
                    </div>
                  ) : null}

                  {/* Total Tagihan Footer */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-medium">
                      Total Belanja
                    </span>
                    <div className="text-right">
                      <span className="text-base font-mono font-extrabold text-stone-950">
                        {formatIDR(order.totalPrice ?? 0)}
                      </span>
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
