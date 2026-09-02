"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top row */}
      <div className="flex-1 w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-black text-slate-900 uppercase hover:opacity-90 cursor-pointer mx-auto sm:mx-0"
        >
          Stealt
          <span className="bg-gradient-to-r from-[#0284C7] to-[#38BDF8] bg-clip-text text-transparent">
            Force
          </span>
        </Link>
      </div>

      <Form
        action="/search"
        className="
          w-full
          sm-w-auto
          sm:flex-1
          sm:mx-4
          mt-2
          sm:mt-0"
      >
        <input
          type="text"
          name="query"
          placeholder="Search for products"
          className="bg-slate-50 text-slate-800 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0284C7] border border-[#BAE6FD] w-full max-w-4xl"
        />
      </Form>

      <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
        <Link
          href="/basket"
          className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold py-2 px-5 rounded-full shadow-sm shadow-sky-500/25"
        >
          <TrolleyIcon className="w-6 h-6" />

          {/* Span item count once global state is implemented */}
          <span className="absolute -top-2 -right-2 bg-sky-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {itemCount}
          </span>
          <span>My Basket</span>
        </Link>

        {/* User area */}
        <ClerkLoaded>
          {
            <SignedIn>
              <Link
                href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold py-2 px-5 rounded-full shadow-sm shadow-sky-500/25"
              >
                <PackageIcon className="w-6 h-6"></PackageIcon>
                <span>My Orders</span>
              </Link>
            </SignedIn>
          }

          {user ? (
            <div className="flex items-center space-x-2">
              <UserButton />

              <div className="hidden sm:block text-xs">
                <p className="text-gray-400"> Welcome Back</p>
                <p className="font-bold">{user.fullName}!</p>
                <p></p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal" />
          )}

          {user?.passkeys.length === 0 && (
            <button
              onClick={createClerkPasskey}
              className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
            >
              Create passkey
            </button>
          )}
        </ClerkLoaded>
      </div>
    </header>
  );
}

export default Header;
