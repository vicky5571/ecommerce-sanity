import { imageUrl } from "@/lib/imageUrl";
import { formatIDR } from "@/lib/formatIDR";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import ProductBuyBox from "@/components/ProductBuyBox";
import { ChevronRight, Home, ShieldCheck } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 60;

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 md:pb-16">
        
        {/* 1. Breadcrumb Navigation Trail */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="flex items-center gap-1 hover:text-[#03AC0E] transition-colors shrink-0">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link href="/categories" className="hover:text-[#03AC0E] transition-colors shrink-0">
            Kategori
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="font-semibold text-stone-900 truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout: 2 Columns on Tablet & Desktop (Image Left 50%, Content + Checkout Right 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Product Image (Half screen width on tablet/desktop) */}
          <div className="w-full md:sticky md:top-24">
            <div className={`relative aspect-square w-full overflow-hidden rounded-2xl bg-white border border-stone-200 shadow-xs p-6 ${isOutOfStock ? "opacity-60" : ""}`}>
              {product.image && (
                <Image
                  src={imageUrl(product.image).url()}
                  alt={product.name ?? "Product Image"}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              )}
              {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-stone-950/60 backdrop-blur-[2px]">
                  <span className="text-white font-bold text-sm tracking-wider uppercase px-4 py-1.5 rounded-lg bg-stone-900/90 border border-white/20">
                    Stok Habis / Out of Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title, Price, Description, then Checkout Buy Box Card */}
          <div className="w-full space-y-6">
            
            {/* Top: Product Title & Price Header */}
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#E8F8EA] text-[#03AC0E] border border-[#B2E5B5] mb-2.5">
                <ShieldCheck className="w-3 h-3" /> Official Product
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="mt-3 text-2xl sm:text-3xl font-mono font-extrabold text-stone-950 tracking-tight">
                {formatIDR(product.price ?? 0)}
              </div>
            </div>

            {/* Middle: Description */}
            <div className="pt-5 border-t border-stone-200/80">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Deskripsi Produk
              </h2>
              <div className="prose prose-stone prose-sm max-w-none text-stone-700 leading-relaxed">
                {Array.isArray(product.description) && <PortableText value={product.description} />}
              </div>
            </div>

            {/* Bottom: Checkout Card placed below description */}
            <div className="pt-4 border-t border-stone-200/80">
              <ProductBuyBox product={product} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;
