"use client";

import { imageUrl } from "@/lib/imageUrl";
import { formatIDR } from "@/lib/formatIDR";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import useBasketStore from "@/store/store";
import { ShoppingCart, Plus, Check } from "lucide-react";
import { useState } from "react";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  const isLowStock =
    product.stock != null && product.stock > 0 && product.stock <= 5;
  const { addItem, getItemCount } = useBasketStore();
  const quantity = getItemCount(product._id);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group relative flex w-full h-full flex-col bg-white rounded-2xl border border-[#BAE6FD]/70 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/10 hover:border-[#38BDF8] hover:-translate-y-1 overflow-hidden">
      <Link
        href={`/product/${product.slug?.current}`}
        className="flex flex-col flex-1"
      >
        {/* Image Canvas Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-sky-50/40 to-white p-3 sm:p-4">
          {product.image && (
            <Image
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              src={imageUrl(product.image).url()}
              alt={product.name || "Product image"}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
            />
          )}

          {/* Top Badges (Category / Stock status) */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 pointer-events-none">
            {/* Category / Official Pill */}
            <span className="text-[10px] font-bold tracking-tight px-2.5 py-0.5 rounded-full bg-[#E0F2FE]/90 backdrop-blur-sm text-[#0284C7] border border-[#BAE6FD] shadow-2xs">
              Official
            </span>

            {/* Stock State Badge */}
            {isLowStock && (
              <span className="text-[10px] font-extrabold tracking-tight px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/90 shadow-2xs animate-pulse">
                Sisa {product.stock}
              </span>
            )}
          </div>

          {/* Out of Stock Dark Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px]">
              <span className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-3.5 py-1 rounded-full bg-slate-900/90 border border-white/20">
                Habis / Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Information Body */}
        <div className="flex flex-col flex-1 p-3.5 justify-between border-t border-slate-100 bg-white">
          <div>
            <h2 className="text-xs sm:text-sm font-medium text-slate-800 leading-snug line-clamp-2 min-h-[2.5em] tracking-tight group-hover:text-[#0284C7] transition-colors">
              {product.name}
            </h2>

            {/* Price Tag */}
            <p className="mt-2 text-sm sm:text-base font-mono font-extrabold text-slate-950 tracking-tight">
              {formatIDR(product.price ?? 0)}
            </p>
          </div>

          {/* Location & Rating Accent */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate">Kota Jakarta Pusat</span>
            {product.stock != null && product.stock > 5 && (
              <span className="text-[#0284C7] font-semibold shrink-0">
                Stok Ready
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick "Add to Basket" Floating Action on Card */}
      {!isOutOfStock && (
        <div className="px-3.5 pb-3.5 pt-0 bg-white">
          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to basket`}
            className={`w-full py-2 px-3 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs border ${
              justAdded
                ? "bg-[#E0F2FE] border-[#0284C7] text-[#0284C7]"
                : "bg-white hover:bg-gradient-to-r hover:from-[#0284C7] hover:to-[#38BDF8] text-slate-700 hover:text-white border-[#BAE6FD] hover:border-transparent hover:shadow-md hover:shadow-sky-500/20"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Ditambahkan ({quantity})</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Keranjang</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductThumb;
