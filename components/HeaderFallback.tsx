"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useBasketStore from "@/store/store";
import SearchBar from "./SearchBar";

function HeaderFallback() {
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link href="/" className="shrink-0 text-xl font-extrabold tracking-tight text-blue-500 transition-opacity hover:opacity-70 sm:text-2xl">
          StealtForce
        </Link>

        <SearchBar className="order-last w-full md:order-none md:w-auto md:min-w-0 md:flex-1" />

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link href="/basket" aria-label="My Basket" className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-500">
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">{itemCount}</span>
            )}
          </Link>

          <span className="hidden text-sm text-gray-500 sm:block">Sign-in disabled in this build</span>
        </div>
      </div>
    </header>
  );
}

export default HeaderFallback;
