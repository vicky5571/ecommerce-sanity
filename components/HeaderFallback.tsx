"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useBasketStore from "@/store/store";
import SearchBar from "./SearchBar";

function HeaderFallback() {
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link href="/" className="shrink-0 text-xl font-black tracking-tight text-stone-950 transition-opacity hover:opacity-80 sm:text-2xl uppercase">
          Stealt<span className="text-[#03AC0E]">Force</span>
        </Link>

        <SearchBar className="order-last w-full md:order-none md:w-auto md:min-w-0 md:flex-1" />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/basket" aria-label="My Basket" className="relative rounded-lg p-2 text-stone-700 transition-colors hover:bg-[#E8F8EA] hover:text-[#03AC0E]">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#03AC0E] px-1 text-xs font-mono font-bold text-white shadow-sm">{itemCount}</span>
            )}
          </Link>

          <span className="hidden text-sm text-gray-500 sm:block">Sign-in disabled in this build</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderFallback;
