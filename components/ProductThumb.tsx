import { imageUrl } from "@/lib/imageUrl";
import { formatIDR } from "@/lib/formatIDR";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex w-full h-full flex-col bg-white rounded-xl border border-stone-200/90 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#03AC0E] hover:-translate-y-0.5 overflow-hidden ${isOutOfStock ? "opacity-60" : ""}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-stone-50/50 p-3">
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 18vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-950/60 backdrop-blur-[2px]">
            <span className="text-white font-semibold text-xs sm:text-sm tracking-wide uppercase px-2.5 py-1 rounded bg-stone-900/80 border border-white/20">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-3.5 justify-between border-t border-stone-100">
        <h2 className="text-xs sm:text-sm font-medium text-stone-800 leading-snug line-clamp-2 min-h-[2.5em] tracking-tight group-hover:text-[#03AC0E] transition-colors">{product.name}</h2>

        <p className="mt-2 text-sm sm:text-base font-mono font-extrabold text-stone-950 tracking-tight">{formatIDR(product.price ?? 0)}</p>
      </div>
    </Link>
  );
}

export default ProductThumb;
