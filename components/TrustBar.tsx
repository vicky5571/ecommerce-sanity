import { Truck, ShieldCheck, Lock, RotateCcw } from "lucide-react";

export default function TrustBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-white border border-stone-200/90 shadow-2xs mb-6 text-xs text-stone-700">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-[#E8F8EA] text-[#03AC0E] shrink-0">
          <Truck className="w-4 h-4" />
        </div>
        <div>
          <p className="font-bold text-stone-900 leading-tight">Pengiriman Cepat</p>
          <p className="text-[11px] text-stone-500">JNE &amp; SiCepat</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-[#E8F8EA] text-[#03AC0E] shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <p className="font-bold text-stone-900 leading-tight">100% Original</p>
          <p className="text-[11px] text-stone-500">Jaminan Asli</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-[#E8F8EA] text-[#03AC0E] shrink-0">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <p className="font-bold text-stone-900 leading-tight">Stripe &amp; QRIS</p>
          <p className="text-[11px] text-stone-500">Transaksi Aman</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-[#E8F8EA] text-[#03AC0E] shrink-0">
          <RotateCcw className="w-4 h-4" />
        </div>
        <div>
          <p className="font-bold text-stone-900 leading-tight">Garansi Retur</p>
          <p className="text-[11px] text-stone-500">7 Hari Penukaran</p>
        </div>
      </div>
    </div>
  );
}
