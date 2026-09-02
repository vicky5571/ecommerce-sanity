"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/store/store";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  //   const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-background p-4">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#BAE6FD]/80 shadow-sm max-w-2xl w-full mx-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-[#E0F2FE] text-[#0284C7] rounded-full flex items-center justify-center shadow-sm">
            <svg
              className="h-10 w-10 text-[#0284C7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          Terima Kasih Atas Pesanan Anda!
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Pesanan Anda telah kami konfirmasi dan sedang disiapkan untuk
          pengiriman segera.
        </p>

        <div className="border-t border-b border-slate-100 py-6 my-6 text-left">
          <div className="space-y-2">
            {orderNumber && (
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-slate-500 font-medium">
                  Nomor Pesanan
                </span>
                <span className="font-mono font-bold text-[#0284C7]">
                  {orderNumber}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">
                Status Pembayaran
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-xs">
                Berhasil / Paid
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-xs text-slate-400">
            Bukti konfirmasi telah dikirimkan ke alamat email terdaftar Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold px-6 py-3 shadow-md shadow-sky-500/25"
            >
              <Link href="/orders">Lihat Status Pesanan</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-2 border-[#0284C7] text-[#0284C7] hover:bg-[#E0F2FE] font-bold px-6 py-3"
            >
              <Link href="/">Lanjut Belanja</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
