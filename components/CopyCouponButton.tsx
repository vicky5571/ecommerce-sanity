"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyCouponButtonProps {
  couponCode: string;
  discountAmount?: number;
}

export default function CopyCouponButton({
  couponCode,
  discountAmount,
}: CopyCouponButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = couponCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Salin kode kupon ${couponCode}`}
      className={`group relative inline-flex items-center gap-2.5 py-3 sm:py-3.5 px-5 sm:px-7 rounded-full shadow-lg transition-all duration-300 border ${
        copied
          ? "bg-emerald-50 text-emerald-900 border-emerald-300 shadow-emerald-900/10 scale-105"
          : "bg-white text-slate-900 border-white hover:border-[#BAE6FD] hover:scale-105 shadow-sky-950/20"
      }`}
    >
      <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
        <span>Kode:</span>
        <span className="font-black font-mono tracking-wide text-[#0284C7] group-hover:underline">
          {couponCode}
        </span>
      </div>

      {discountAmount != null && (
        <>
          <span className="w-px h-4 bg-slate-200 mx-0.5" />
          <span className="font-extrabold text-xs sm:text-sm text-[#0284C7]">
            Diskon {discountAmount}%
          </span>
        </>
      )}

      <div
        className={`ml-1 flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
          copied
            ? "bg-emerald-500 text-white"
            : "bg-[#E0F2FE] text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Tersalin!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salin</span>
          </>
        )}
      </div>
    </button>
  );
}

