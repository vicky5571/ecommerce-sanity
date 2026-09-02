import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

  if (!sale?.isActive) {
    return null;
  }
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#0369A1] text-white px-6 sm:px-10 py-8 sm:py-12 mx-0 mt-2 mb-6 rounded-2xl sm:rounded-3xl shadow-xl shadow-sky-500/15 border border-[#BAE6FD]/40">
      {/* Decorative background glow circles */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-sky-300/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/25 text-sky-100">
            Promo Spesial Hari Ini
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {sale.title}
          </h2>
          <p className="text-sm sm:text-lg text-sky-100/95 max-w-xl font-medium leading-relaxed">
            {sale.description}
          </p>
        </div>

        <div className="shrink-0">
          <div className="inline-flex items-center gap-2 bg-white text-slate-900 py-3 sm:py-3.5 px-5 sm:px-7 rounded-full shadow-lg shadow-sky-950/20 hover:scale-105 transition-all duration-300 border border-white">
            <span className="font-bold text-xs sm:text-sm">
              Kode:{" "}
              <span className="text-[#0284C7] font-black">
                {sale.couponCode}
              </span>
            </span>
            <span className="w-px h-4 bg-slate-200 mx-1" />
            <span className="font-extrabold text-xs sm:text-sm text-[#0284C7]">
              Diskon {sale.discountAmount}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;
