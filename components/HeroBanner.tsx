import Link from "next/link";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-950 text-white p-6 sm:p-8 lg:p-10 shadow-sm mb-6 border border-stone-800">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#03AC0E]/20 text-[#03AC0E] border border-[#03AC0E]/30 mb-3">
          <Sparkles className="w-3 h-3" /> New Release 2026
        </span>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
          Engineered Everyday Essentials
        </h1>
        <p className="mt-2.5 text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed">
          Koleksi apparel taktis & perlengkapan harian dengan material tahan lama dan kenyamanan maksimal.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#03AC0E] hover:bg-[#028A0B] text-white text-xs sm:text-sm font-bold transition-colors shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Jelajahi Koleksi</span>
          </Link>
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#03AC0E]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
