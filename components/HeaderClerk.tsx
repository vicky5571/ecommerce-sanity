"use client";

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Package, ShoppingCart } from "lucide-react";
import useBasketStore from "@/store/store";
import SearchBar from "./SearchBar";

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

          <ClerkLoaded>
            <SignedIn>
              <Link href="/orders" aria-label="My Orders" className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-500">
                <Package className="h-6 w-6" />
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center gap-2">
                <UserButton />
                <div className="hidden text-xs lg:block">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold text-gray-800">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button onClick={createClerkPasskey} className="hidden rounded-lg border border-blue-300 px-3 py-1.5 text-sm font-semibold text-blue-500 transition-colors hover:bg-blue-50 md:block">
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default HeaderClerk;
