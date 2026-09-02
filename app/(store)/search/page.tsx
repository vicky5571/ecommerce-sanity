import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  if (!products.length) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-background">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#BAE6FD]/80 shadow-sm max-w-lg w-full text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mx-auto shadow-sm">
            <Search className="w-8 h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">
            Tidak ada produk untuk: &ldquo;{query}&rdquo;
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Coba gunakan kata kunci yang lebih umum atau periksa ejaan kata
            pencarian Anda.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] font-semibold text-xs tracking-wider uppercase mb-1 border border-[#BAE6FD]">
              Hasil Pencarian
            </span>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight break-words">
              &ldquo;{query}&rdquo;
            </h1>
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium">
            Ditemukan {products.length} produk
          </span>
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;
