"use client";

import { Product } from "@/sanity.types";
import useBasketStore from "@/store/store";
import { formatIDR } from "@/lib/formatIDR";
import { useState } from "react";
import { ShoppingCart, Zap, Check, ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductBuyBox({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  const isLowStock = product.stock != null && product.stock > 0 && product.stock <= 5;
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
    <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-5">
      {/* Stock Status Indicator */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Status Stok</span>
        {isOutOfStock ? (
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-stone-100 text-stone-500 border border-stone-200">
            Stok Habis
          </span>
        ) : isLowStock ? (
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
            Sisa {product.stock} barang
          </span>
        ) : (
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#E8F8EA] text-[#03AC0E] border border-[#B2E5B5]">
            Stok Tersedia {product.stock ? `(${product.stock})` : ""}
          </span>
        )}
      </div>

      {/* Quantity Selector & Subtotal */}
      {!isOutOfStock && (
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-600 font-medium">Jumlah:</span>
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-200 disabled:opacity-40 disabled:hover:bg-transparent font-bold transition-colors"
              >
                -
              </button>
              <span className="w-9 text-center font-mono font-bold text-sm text-stone-900 bg-white py-1">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                disabled={quantity >= maxStock}
                className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-200 disabled:opacity-40 disabled:hover:bg-transparent font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-stone-400 block">Subtotal</span>
            <span className="text-base font-mono font-bold text-stone-950">
              {formatIDR((product.price ?? 0) * quantity)}
            </span>
          </div>
        </div>
      )}

      {/* Dual CTA Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-150 flex items-center justify-center gap-2 shadow-xs border ${
            isOutOfStock
              ? "bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed"
              : justAdded
              ? "bg-[#E8F8EA] text-[#03AC0E] border-[#03AC0E]"
              : "bg-white hover:bg-[#E8F8EA] text-[#03AC0E] border-[#03AC0E] hover:border-[#028A0B]"
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
          className={`w-full py-3 px-4 rounded-xl text-sm font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-sm ${
            isOutOfStock
              ? "bg-stone-300 cursor-not-allowed"
              : "bg-[#03AC0E] hover:bg-[#028A0B]"
          }`}
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Beli Langsung</span>
        </button>
      </div>

      {/* Quick Perks */}
      <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-3 text-[11px] text-stone-600">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#03AC0E] shrink-0" />
          <span>Pengiriman Cepat</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#03AC0E] shrink-0" />
          <span>100% Original</span>
        </div>
      </div>
    </div>
  );
}
