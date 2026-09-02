import Link from "next/link";
import { ShieldCheck, HelpCircle, PhoneCall, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0F172A] relative text-slate-300 text-xs sm:text-sm overflow-hidden">
      {/* Top Accent Gradient Bar inspired by applyinternshipioh_new */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#0284C7]" />

      {/* Main Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand & About */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link
              href="/"
              className="inline-block text-xl font-black tracking-tight text-white uppercase"
            >
              Stealt
              <span className="bg-gradient-to-r from-[#0284C7] to-[#38BDF8] bg-clip-text text-transparent">
                Force
              </span>
            </Link>
            <p className="mt-2 text-slate-400 text-xs leading-relaxed max-w-sm">
              Situs belanja online fashion dan perlengkapan harian terpercaya
              dengan integrasi Sanity CMS &amp; Stripe Checkout.
            </p>

            <div className="mt-4 flex items-center gap-2 text-slate-200 font-semibold text-xs">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#E0F2FE]/20 text-[#38BDF8]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span>100% Produk Original &amp; Terverifikasi</span>
            </div>

            {/* Quick Contact info */}
            <div className="mt-3 flex items-center gap-2 text-slate-400 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Customer Care: care@stealtforce.id</span>
            </div>
          </div>

          {/* Col 2: Beli & Belanja */}
          <div>
            <h4 className="font-bold text-[#38BDF8] mb-3 text-sm tracking-wide uppercase">
              Beli &amp; Belanja
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all"
                >
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all"
                >
                  Kategori Pilihan
                </Link>
              </li>
              <li>
                <Link
                  href="/search?query="
                  className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all"
                >
                  Cari Barang
                </Link>
              </li>
              <li>
                <Link
                  href="/basket"
                  className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all"
                >
                  Keranjang Belanja
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Bantuan & Panduan */}
          <div>
            <h4 className="font-bold text-[#38BDF8] mb-3 text-sm tracking-wide uppercase">
              Bantuan &amp; Panduan
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link
                  href="/orders"
                  className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all"
                >
                  Status &amp; Lacak Pesanan
                </Link>
              </li>
              <li>
                <span className="hover:text-[#38BDF8] hover:translate-x-1 inline-block cursor-pointer transition-all">
                  Syarat &amp; Ketentuan
                </span>
              </li>
              <li>
                <span className="hover:text-[#38BDF8] hover:translate-x-1 inline-block cursor-pointer transition-all">
                  Kebijakan Privasi
                </span>
              </li>
              <li>
                <span className="hover:text-[#38BDF8] hover:translate-x-1 inline-flex items-center gap-1 cursor-pointer transition-all">
                  <HelpCircle className="w-3 h-3 text-[#38BDF8]" />
                  Pusat Bantuan
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Developer */}
          <div>
            <h4 className="font-bold text-[#38BDF8] mb-3 text-sm tracking-wide uppercase">
              Developer &amp; Studio
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link
                  href="/studio"
                  className="hover:text-[#38BDF8] hover:translate-x-1 inline-flex items-center gap-1 transition-all"
                >
                  <span>Sanity Studio</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                </Link>
              </li>
              <li>
                <Link
                  href="/draft-mode/enable"
                  className="hover:text-[#38BDF8] hover:translate-x-1 inline-block transition-all"
                >
                  Live Preview Mode
                </Link>
              </li>
              <li>
                <span className="text-slate-400 text-[11px] block mt-1">
                  Mata Uang:{" "}
                  <strong className="text-white">IDR (Rupiah)</strong>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners & Payment Section */}
        <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Metode Pembayaran
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-[11px] font-bold">
                BCA
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-[11px] font-bold">
                MANDIRI
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-[11px] font-bold">
                BRI
              </span>
              <span className="px-2.5 py-1 rounded-full bg-sky-950/70 border border-sky-500/40 text-[#38BDF8] text-[11px] font-bold">
                QRIS
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-[11px] font-bold">
                GOPAY
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-[11px] font-bold">
                STRIPE
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-[11px] font-bold">
                VISA / MASTER
              </span>
            </div>
          </div>

          <div className="md:text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              Partner Logistik &amp; Pengiriman
            </span>
            <div className="flex flex-wrap items-center md:justify-end gap-2">
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-[11px] font-medium">
                JNE Express
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-[11px] font-medium">
                SiCepat
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-[11px] font-medium">
                J&amp;T
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-[11px] font-medium">
                GoSend / Grab
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-[#090D16] border-t border-slate-800/80 pt-4 pb-20 md:pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>© 2026 StealtForce. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#38BDF8] cursor-pointer transition-colors">
              Tentang Kami
            </span>
            <span className="hover:text-[#38BDF8] cursor-pointer transition-colors">
              Mitra Platform
            </span>
            <span className="hover:text-[#38BDF8] cursor-pointer transition-colors">
              Pusat Bantuan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
