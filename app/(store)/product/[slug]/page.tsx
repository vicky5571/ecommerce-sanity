import type { Metadata } from "next";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
      description: "Produk yang Anda cari tidak tersedia di StealtForce.",
    };
  }

  const title = product.name ?? "Produk StealtForce";
  const priceFormatted = formatIDR(product.price ?? 0);
  const description = `Beli ${title} seharga ${priceFormatted} dengan jaminan 100% original hanya di StealtForce.`;
  const imageSrc = product.image ? imageUrl(product.image).url() : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} - ${priceFormatted} | StealtForce`,
      description,
      images: imageSrc
        ? [
            {
              url: imageSrc,
              width: 800,
              height: 800,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${priceFormatted}`,
      description,
      images: imageSrc ? [imageSrc] : [],
    },
  };
}

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
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto no-scrollbar py-1"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#0284C7] transition-colors shrink-0 font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            href="/categories"
            className="hover:text-[#0284C7] transition-colors shrink-0 font-medium"
          >
            Kategori
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout: 2 Columns on Tablet & Desktop (Image Left 50%, Content + Checkout Right 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Image (Half screen width on tablet/desktop) */}
          <div className="w-full md:sticky md:top-24">
            <div
              className={`relative aspect-square w-full overflow-hidden rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-xs p-6 ${isOutOfStock ? "opacity-60" : ""}`}
            >
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
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px]">
                  <span className="text-white font-bold text-sm tracking-wider uppercase px-4 py-1.5 rounded-full bg-slate-900/90 border border-white/20">
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
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] mb-2.5">
                <ShieldCheck className="w-3 h-3" /> Official Product
              </span>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="mt-3 text-2xl sm:text-3xl font-mono font-extrabold text-slate-950 tracking-tight">
                {formatIDR(product.price ?? 0)}
              </div>
            </div>

            {/* Middle: Description */}
            <div className="pt-5 border-t border-[#BAE6FD]/60">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Deskripsi Produk
              </h2>
              <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed">
                {Array.isArray(product.description) && (
                  <PortableText value={product.description} />
                )}
              </div>
            </div>

            {/* Bottom: Checkout Card placed below description */}
            <div className="pt-4 border-t border-[#BAE6FD]/60">
              <ProductBuyBox product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
