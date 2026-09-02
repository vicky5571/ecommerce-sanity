"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { formatIDR } from "@/lib/formatIDR";
import { useState } from "react";
import { ShoppingCart, Zap, Check, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductBuyBox({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  const isLowStock =
    product.stock != null && product.stock > 0 && product.stock <= 5;
  const isStockAvailable = product.stock == null || product.stock > 0;

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useBasketStore();
  const router = useRouter();

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    router.push("/basket");
  };

  const maxStock = product.stock ?? 99;

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-xs space-y-5">
      {/* Stock Status Indicator */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Status Stok
        </span>
        {isOutOfStock ? (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
            Stok Habis
          </span>
        ) : isLowStock ? (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
            Sisa {product.stock} barang
          </span>
        ) : (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
            Stok Tersedia {product.stock ? `(${product.stock})` : ""}
          </span>
        )}
      </div>

      {/* Quantity Selector & Subtotal */}
      {!isOutOfStock && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Jumlah:</span>
            <div className="flex items-center border border-[#BAE6FD] rounded-full overflow-hidden bg-slate-50">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7] disabled:opacity-40 disabled:hover:bg-transparent font-bold transition-colors"
              >
                -
              </button>
              <span className="w-9 text-center font-mono font-bold text-sm text-slate-900 bg-white py-1">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                disabled={quantity >= maxStock}
                className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7] disabled:opacity-40 disabled:hover:bg-transparent font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Subtotal</span>
            <span className="text-base font-mono font-bold text-slate-950">
              {formatIDR((product.price ?? 0) * quantity)}
            </span>
          </div>
        </div>
      )}

      {/* Dual CTA Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3 px-5 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-2xs border ${
            isOutOfStock
              ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
              : justAdded
                ? "bg-[#E0F2FE] text-[#0284C7] border-[#0284C7]"
                : "bg-white hover:bg-[#E0F2FE] text-[#0284C7] border-2 border-[#0284C7] hover:scale-[1.01]"
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Berhasil Ditambahkan!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>+ Keranjang</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`w-full py-3.5 px-5 rounded-full text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 ${
            isOutOfStock
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 hover:scale-[1.01]"
          }`}
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Beli Langsung</span>
        </button>
      </div>

      {/* Quick Perks */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px] text-slate-600">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#0284C7] shrink-0" />
          <span>Pengiriman Cepat</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#0284C7] shrink-0" />
          <span>100% Original</span>
        </div>
      </div>
    </div>
  );
}
