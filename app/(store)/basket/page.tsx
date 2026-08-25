"use client";

import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import { formatIDR } from "@/lib/formatIDR";
import { ShoppingBag, Trash2, ShieldCheck, ArrowRight, RotateCcw, Lock } from "lucide-react";

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
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E8F8EA] text-[#03AC0E] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-900">Wah, keranjang belanjamu kosong!</h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Yuk, jelajahi katalog produk pilihan kami dan temukan barang favoritmu.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white font-bold text-sm transition-colors shadow-sm"
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
        customerEmail: primaryEmail ? ((primaryEmail as any).emailAddress ?? (primaryEmail as any).email ?? "Unknown") : "Unknown",
        clerkUserId: user?.id ?? "Unknown",
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
      try {
        const msg = error instanceof Error ? error.message : JSON.stringify(error);
        // eslint-disable-next-line no-alert
        alert("Checkout error: " + msg);
      } catch (e) {
        // ignore
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalQuantity = groupedItems.reduce((total, item) => total + item.quantity, 0);
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
                  className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                >
                  {/* Thumbnail & Product Details */}
                  <div
                    className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                    onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-stone-50/70 p-2 border border-stone-100 flex-shrink-0 relative overflow-hidden">
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
                      <h2 className="text-sm font-bold text-stone-900 truncate hover:text-[#03AC0E] transition-colors">
                        {item.product.name}
                      </h2>
                      
                      {/* Unit Price Breakdown */}
                      <p className="text-xs text-stone-500 font-mono mt-0.5">
                        @ {formatIDR(item.product.price ?? 0)} × {item.quantity}
                      </p>

                      {/* Subtotal */}
                      <p className="text-sm font-mono font-extrabold text-[#03AC0E] mt-1.5">
                        {formatIDR(itemTotal)}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Stepper + Trash Delete Icon */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                      <button
                        type="button"
                        onClick={() => removeItem(item.product._id)}
                        className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-xs text-stone-900 bg-white py-1">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => addItem(item.product)}
                        className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete Item Trash Button */}
                    <button
                      type="button"
                      onClick={() => deleteItem(item.product._id)}
                      aria-label="Hapus barang"
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
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
            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-stone-900">
                Ringkasan Belanja
              </h3>

              <div className="space-y-2.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Total Harga ({totalQuantity} barang)</span>
                  <span className="font-mono font-semibold text-stone-900">{formatIDR(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Pengiriman</span>
                  <span className="text-[#03AC0E] font-medium">Dihitung saat checkout</span>
                </div>
              </div>

              {/* Total Tagihan */}
              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-stone-900">Total Tagihan</span>
                <span className="text-xl font-mono font-extrabold text-stone-950">
                  {formatIDR(totalPrice)}
                </span>
              </div>

              {/* Checkout CTA */}
              {isSignedIn ? (
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:bg-stone-300"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isLoading ? "Memproses..." : "Lanjut ke Pembayaran"}</span>
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="w-full py-3 px-4 rounded-xl bg-[#03AC0E] hover:bg-[#028A0B] text-white font-bold text-sm shadow-sm transition-colors"
                  >
                    Masuk untuk Checkout
                  </button>
                </SignInButton>
              )}

              {/* Trust Footnote */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#03AC0E]" />
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
