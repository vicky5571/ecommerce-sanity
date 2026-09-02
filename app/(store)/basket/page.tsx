"use client";

import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import { formatIDR } from "@/lib/formatIDR";
import {
  ShoppingBag,
  Trash2,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Lock,
} from "lucide-react";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { addItem, removeItem, deleteItem, clearBasket } = useBasketStore();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  // 1. Rich Empty State with Action CTA
  if (groupedItems.length === 0) {
    return (
      <div className="bg-background min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Wah, keranjang belanjamu kosong!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Yuk, jelajahi katalog produk pilihan kami dan temukan barang
              favoritmu sekarang juga.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold text-sm transition-all shadow-md shadow-sky-500/25 hover:scale-[1.02]"
          >
            <span>Mulai Belanja Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const primaryEmail = user?.emailAddresses?.[0];
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: primaryEmail
          ? ((primaryEmail as any).emailAddress ??
            (primaryEmail as any).email ??
            "Unknown")
          : "Unknown",
        clerkUserId: user?.id ?? "Unknown",
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
      try {
        const msg =
          error instanceof Error ? error.message : JSON.stringify(error);
        // eslint-disable-next-line no-alert
        alert("Checkout error: " + msg);
      } catch (e) {
        // ignore
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalQuantity = groupedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = useBasketStore.getState().getTotalPrice();

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-16">
        {/* Header Title & Clear Action */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Keranjang Belanja
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {totalQuantity} barang dalam pesanan Anda
            </p>
          </div>
          <button
            type="button"
            onClick={clearBasket}
            className="text-xs text-stone-500 hover:text-red-600 transition-colors flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Kosongkan Keranjang</span>
          </button>
        </div>

        {/* 2-Column Cart & Summary Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of Items */}
          <div className="lg:col-span-8 space-y-3">
            {groupedItems.map((item) => {
              const itemTotal = (item.product.price ?? 0) * item.quantity;
              return (
                <div
                  key={item.product._id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#BAE6FD]/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#38BDF8]"
                >
                  {/* Thumbnail & Product Details */}
                  <div
                    className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                    onClick={() =>
                      router.push(`/product/${item.product.slug?.current}`)
                    }
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-sky-50/40 p-2 border border-[#BAE6FD]/60 flex-shrink-0 relative overflow-hidden">
                      {item.product.image && (
                        <Image
                          src={imageUrl(item.product.image).url()}
                          alt={item.product.name ?? "Product image"}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm font-bold text-slate-900 truncate hover:text-[#0284C7] transition-colors">
                        {item.product.name}
                      </h2>

                      {/* Unit Price Breakdown */}
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        @ {formatIDR(item.product.price ?? 0)} × {item.quantity}
                      </p>

                      {/* Subtotal */}
                      <p className="text-sm font-mono font-extrabold text-[#0284C7] mt-1.5">
                        {formatIDR(itemTotal)}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Stepper + Trash Delete Icon */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#BAE6FD] rounded-full overflow-hidden bg-slate-50">
                      <button
                        type="button"
                        onClick={() => removeItem(item.product._id)}
                        className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7] font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-xs text-slate-900 bg-white py-1">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => addItem(item.product)}
                        className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7] font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Item Trash Button */}
                    <button
                      type="button"
                      onClick={() => deleteItem(item.product._id)}
                      aria-label="Hapus barang"
                      className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Order Summary Card (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="p-6 rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Ringkasan Belanja
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Total Harga ({totalQuantity} barang)</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {formatIDR(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Pengiriman</span>
                  <span className="text-[#0284C7] font-medium">
                    Dihitung saat checkout
                  </span>
                </div>
              </div>

              {/* Total Tagihan */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">
                  Total Tagihan
                </span>
                <span className="text-xl font-mono font-extrabold text-slate-950">
                  {formatIDR(totalPrice)}
                </span>
              </div>

              {/* Checkout CTA */}
              {isSignedIn ? (
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:bg-slate-300"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isLoading ? "Memproses..." : "Lanjut ke Pembayaran"}
                  </span>
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01]"
                  >
                    Masuk untuk Checkout
                  </button>
                </SignInButton>
              )}

              {/* Trust Footnote */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Transaksi 100% Aman &amp; Terenkripsi Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
