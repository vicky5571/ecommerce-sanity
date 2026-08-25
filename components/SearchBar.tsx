"use client";

import Form from "next/form";
import { Search } from "lucide-react";

function SearchBar({ className = "" }: { className?: string }) {
  return (
    <Form action="/search" className={className}>
      <div className="relative flex w-full items-center">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name="query"
          placeholder="Search for products..."
          className="w-full rounded-lg border border-stone-200 bg-stone-50/70 py-2 pl-9 pr-20 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#03AC0E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#03AC0E]/20 sm:pr-24 transition-all"
        />
        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-[#03AC0E] px-3 py-1.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#028A0B] sm:px-4 shadow-sm">
          Search
        </button>
      </div>
    </Form>
  );
}

export default SearchBar;
