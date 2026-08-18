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
      className={`group flex w-full h-full flex-col bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 overflow-hidden ${isOutOfStock ? "opacity-60" : ""}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-white">
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
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-sm sm:text-base">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-2.5 pb-2.5 pt-2 sm:px-3 sm:pb-3">
        <h2 className="text-xs sm:text-sm font-normal text-gray-800 leading-snug line-clamp-2 min-h-[2.5em]">{product.name}</h2>

        <p className="mt-1 sm:mt-1.5 text-sm sm:text-base font-bold text-gray-900">{formatIDR(product.price ?? 0)}</p>
      </div>
    </Link>
  );
}

export default ProductThumb;
