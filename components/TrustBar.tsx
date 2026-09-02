import { Truck, ShieldCheck, Lock, RotateCcw } from "lucide-react";

export default function TrustBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#BAE6FD]/70 shadow-xs mb-6 text-xs text-slate-700">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] shrink-0">
          <Truck className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">
            Pengiriman Cepat
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">JNE &amp; SiCepat</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">
            100% Original
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Jaminan Mutu</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] shrink-0">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">
            Transaksi Aman
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Stripe &amp; QRIS</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] shrink-0">
          <RotateCcw className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">
            Garansi Retur
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">7 Hari Garansi</p>
        </div>
      </div>
    </div>
  );
}
