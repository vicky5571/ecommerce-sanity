"use client";

import Form from "next/form";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

function SearchBar({ className = "" }: { className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Form action="/search" className={className}>
      <div className="relative flex w-full items-center">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          ref={inputRef}
          type="text"
          name="query"
          placeholder="Cari barang atau kategori..."
          className="w-full rounded-lg border border-stone-200 bg-stone-50/80 py-2 pl-9 pr-24 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#03AC0E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#03AC0E]/20 transition-all"
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono text-stone-400 bg-white border border-stone-200 px-1.5 py-0.5 rounded shadow-2xs">
            ⌘K
          </kbd>
          <button
            type="submit"
            className="rounded-md bg-[#03AC0E] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#028A0B] shadow-xs"
          >
            Cari
          </button>
        </div>
      </div>
    </Form>
  );
}

export default SearchBar;
