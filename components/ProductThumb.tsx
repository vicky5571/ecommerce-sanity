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
  const isLowStock = product.stock != null && product.stock > 0 && product.stock <= 5;
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
    <div className="group relative flex w-full h-full flex-col bg-white rounded-xl border border-stone-200/90 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-[#03AC0E] hover:-translate-y-0.5 overflow-hidden">
      <Link
        href={`/product/${product.slug?.current}`}
        className="flex flex-col flex-1"
      >
        {/* Image Canvas Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-stone-50/70 p-3 sm:p-4">
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
            <span className="text-[10px] font-bold tracking-tight px-2 py-0.5 rounded bg-white/90 backdrop-blur-sm text-stone-700 border border-stone-200/80 shadow-xs">
              Official
            </span>

            {/* Stock State Badge */}
            {isLowStock && (
              <span className="text-[10px] font-extrabold tracking-tight px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/90 shadow-xs animate-pulse">
                Sisa {product.stock}
              </span>
            )}
          </div>

          {/* Out of Stock Dark Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-950/60 backdrop-blur-[2px]">
              <span className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase px-3 py-1 rounded bg-stone-900/90 border border-white/20">
                Habis / Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Information Body */}
        <div className="flex flex-col flex-1 p-3 sm:p-3.5 justify-between border-t border-stone-100 bg-white">
          <div>
            <h2 className="text-xs sm:text-sm font-medium text-stone-800 leading-snug line-clamp-2 min-h-[2.5em] tracking-tight group-hover:text-[#03AC0E] transition-colors">
              {product.name}
            </h2>

            {/* Price Tag */}
            <p className="mt-2 text-sm sm:text-base font-mono font-extrabold text-stone-950 tracking-tight">
              {formatIDR(product.price ?? 0)}
            </p>
          </div>

          {/* Location & Rating Tokopedia Accent */}
          <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span className="truncate">Kota Jakarta Pusat</span>
            {product.stock != null && product.stock > 5 && (
              <span className="text-[#03AC0E] font-medium shrink-0">Stok Ready</span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick "Add to Basket" Floating Action on Card */}
      {!isOutOfStock && (
        <div className="px-3 pb-3 pt-0 bg-white">
          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to basket`}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-xs border ${
              justAdded
                ? "bg-[#E8F8EA] border-[#03AC0E] text-[#03AC0E]"
                : "bg-white hover:bg-[#03AC0E] text-stone-700 hover:text-white border-stone-300 hover:border-[#03AC0E]"
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
