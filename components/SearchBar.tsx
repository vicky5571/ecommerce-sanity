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
          placeholder="Search for products"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-9 pr-20 text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:pr-24"
        />
        <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 sm:px-4">
          Search
        </button>
      </div>
    </Form>
  );
}

export default SearchBar;
