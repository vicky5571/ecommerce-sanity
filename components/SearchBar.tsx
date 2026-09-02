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
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          name="query"
          placeholder="Cari produk impian Anda..."
          className="w-full rounded-full border border-[#BAE6FD] bg-slate-50/70 py-2 sm:py-2.5 pl-10 pr-24 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#0284C7] focus:bg-white focus:outline-none focus:ring-3 focus:ring-[#0284C7]/20 transition-all shadow-2xs"
        />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono text-slate-400 bg-white border border-[#BAE6FD]/80 px-1.5 py-0.5 rounded-full shadow-2xs">
            ⌘K
          </kbd>
          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] px-3.5 sm:px-4 py-1.5 text-xs font-semibold text-white transition-all hover:opacity-95 shadow-sm shadow-sky-500/25 hover:scale-105"
          >
            Cari
          </button>
        </div>
      </div>
    </Form>
  );
}

export default SearchBar;
