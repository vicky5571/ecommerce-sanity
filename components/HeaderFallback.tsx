"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useBasketStore from "@/store/store";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";

function HeaderFallback() {
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#BAE6FD]/70 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85 shadow-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap sm:flex-nowrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2.5 sm:py-3">
        {/* Brand Logo */}
        <Link href="/" className="shrink-0 flex items-center group">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase group-hover:opacity-90 transition-opacity">
            Stealt
            <span className="bg-gradient-to-r from-[#0284C7] to-[#38BDF8] bg-clip-text text-transparent">
              Force
            </span>
          </span>
        </Link>

        {/* Central Search Bar (Full width on mobile, centered flex-1 on desktop) */}
        <div className="order-last sm:order-none w-full sm:w-auto sm:flex-1 sm:max-w-xl md:max-w-2xl">
          <SearchBar />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/basket"
            aria-label="Keranjang Belanja"
            className="relative flex items-center justify-center p-2 rounded-full text-slate-700 hover:text-[#0284C7] hover:bg-[#E0F2FE] transition-all"
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 600, damping: 25 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] px-1 text-[11px] font-mono font-bold text-white shadow-sm shadow-sky-500/30"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <span className="hidden text-xs text-slate-400 font-medium sm:block">
            Demo Mode
          </span>
        </div>
      </div>
    </header>
  );
}

export default HeaderFallback;
