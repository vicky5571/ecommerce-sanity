"use client";

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";
import useBasketStore from "@/store/store";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";

function HeaderClerk() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/90 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85 shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-6 px-4 py-2.5 sm:py-3">
        
        {/* Brand Logo */}
        <Link href="/" className="shrink-0 flex items-center group">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-950 uppercase group-hover:opacity-85 transition-opacity">
            Stealt<span className="text-[#03AC0E]">Force</span>
          </span>
        </Link>

        {/* Central Search Bar */}
        <div className="flex-1 max-w-2xl">
          <SearchBar />
        </div>

        {/* Action Controls & User Area */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Basket Button with Spring Badge */}
          <Link
            href="/basket"
            aria-label="Keranjang Belanja"
            className="relative flex items-center justify-center p-2 rounded-lg text-stone-700 hover:text-[#03AC0E] hover:bg-[#E8F8EA] transition-all"
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
                  className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#03AC0E] px-1 text-[11px] font-mono font-bold text-white shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* User & Orders Area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                aria-label="Pesanan Saya"
                className="relative flex items-center justify-center p-2 rounded-lg text-stone-700 hover:text-[#03AC0E] hover:bg-[#E8F8EA] transition-all"
              >
                <Package className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </SignedIn>

            <div className="h-5 w-px bg-stone-200 mx-0.5 sm:mx-1" />

            {user ? (
              <div className="flex items-center gap-2 pl-1">
                <UserButton />
                <div className="hidden text-xs lg:block leading-tight">
                  <p className="text-[10px] text-stone-400 font-medium">Akun</p>
                  <p className="font-bold text-stone-800 truncate max-w-[100px]">{user.firstName || user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="text-xs sm:text-sm font-bold text-[#03AC0E] hover:bg-[#E8F8EA] border border-[#B2E5B5] px-3 py-1.5 rounded-lg transition-colors">
                  Masuk
                </button>
              </SignInButton>
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="hidden rounded-lg border border-stone-200 px-2.5 py-1 text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-50 xl:block"
              >
                Passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default HeaderClerk;
