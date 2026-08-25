import Link from "next/link";
import { ShieldCheck, HelpCircle, PhoneCall, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-stone-200 text-stone-600 text-xs sm:text-sm">
      {/* Main Link Columns (Tokopedia Style) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & About */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block text-xl font-black tracking-tight text-stone-900 uppercase">
              Stealt<span className="text-[#03AC0E]">Force</span>
            </Link>
            <p className="mt-2 text-stone-500 text-xs leading-relaxed max-w-sm">
              Situs belanja online fashion dan perlengkapan harian terpercaya dengan integrasi Sanity CMS & Stripe Checkout.
            </p>

            <div className="mt-4 flex items-center gap-2 text-stone-700 font-semibold text-xs">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#E8F8EA] text-[#03AC0E]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span>100% Produk Original & Terverifikasi</span>
            </div>

            {/* Quick Contact info */}
            <div className="mt-3 flex items-center gap-2 text-stone-500 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-stone-400" />
              <span>Customer Care: care@stealtforce.id</span>
            </div>
          </div>

          {/* Col 2: Beli & Belanja */}
          <div>
            <h4 className="font-bold text-stone-900 mb-3 text-sm">Beli & Belanja</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/" className="hover:text-[#03AC0E] transition-colors">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#03AC0E] transition-colors">
                  Kategori Pilihan
                </Link>
              </li>
              <li>
                <Link href="/search?query=" className="hover:text-[#03AC0E] transition-colors">
                  Cari Barang
                </Link>
              </li>
              <li>
                <Link href="/basket" className="hover:text-[#03AC0E] transition-colors">
                  Keranjang Belanja
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Bantuan & Panduan */}
          <div>
            <h4 className="font-bold text-stone-900 mb-3 text-sm">Bantuan & Panduan</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/orders" className="hover:text-[#03AC0E] transition-colors">
                  Status & Lacak Pesanan
                </Link>
              </li>
              <li>
                <span className="hover:text-[#03AC0E] cursor-pointer transition-colors">
                  Syarat & Ketentuan
                </span>
              </li>
              <li>
                <span className="hover:text-[#03AC0E] cursor-pointer transition-colors">
                  Kebijakan Privasi
                </span>
              </li>
              <li>
                <span className="hover:text-[#03AC0E] cursor-pointer transition-colors flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-stone-400" />
                  Pusat Bantuan
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Developer */}
          <div>
            <h4 className="font-bold text-stone-900 mb-3 text-sm">Developer & Studio</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/studio" className="hover:text-[#03AC0E] transition-colors flex items-center gap-1">
                  <span>Sanity Studio</span>
                  <ExternalLink className="w-2.5 h-2.5 text-stone-400" />
                </Link>
              </li>
              <li>
                <Link href="/draft-mode/enable" className="hover:text-[#03AC0E] transition-colors">
                  Live Preview Mode
                </Link>
              </li>
              <li>
                <span className="text-stone-400 text-[11px] block mt-1">
                  Mata Uang: <strong className="text-stone-700">IDR (Rupiah)</strong>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Partners & Payment Section (Clean Tokopedia Badges) */}
        <div className="mt-10 pt-6 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Metode Pembayaran
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-700 text-[11px] font-bold">
                BCA
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-700 text-[11px] font-bold">
                MANDIRI
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-700 text-[11px] font-bold">
                BRI
              </span>
              <span className="px-2 py-1 rounded bg-[#E8F8EA] border border-[#B2E5B5] text-[#03AC0E] text-[11px] font-bold">
                QRIS
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-700 text-[11px] font-bold">
                GOPAY
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-700 text-[11px] font-bold">
                STRIPE
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-700 text-[11px] font-bold">
                VISA / MASTER
              </span>
            </div>
          </div>

          <div className="md:text-right">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Partner Logistik & Pengiriman
            </span>
            <div className="flex flex-wrap items-center md:justify-end gap-2">
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-medium">
                JNE Express
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-medium">
                SiCepat
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-medium">
                J&amp;T
              </span>
              <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200 text-stone-600 text-[11px] font-medium">
                GoSend / Grab
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-stone-50 border-t border-stone-200/80 pt-4 pb-20 md:pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500">
          <p>© 2026 StealtForce. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#03AC0E] cursor-pointer">Tentang Kami</span>
            <span className="hover:text-[#03AC0E] cursor-pointer">Mitra Tokopedia</span>
            <span className="hover:text-[#03AC0E] cursor-pointer">Pusat Edukasi Seller</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
