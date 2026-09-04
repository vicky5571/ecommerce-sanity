"use client";

import Form from "next/form";
import { Search, Loader2, ChevronRight, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { searchProductsAction } from "@/actions/searchProducts";
import { Product } from "@/sanity.types";
import { imageUrl } from "@/lib/imageUrl";
import { formatIDR } from "@/lib/formatIDR";

function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced live search
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const fetched = await searchProductsAction(trimmed);
        setResults(fetched);
        setIsOpen(true);
      } catch (err) {
        console.error("Live search failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectProduct = (slug?: string) => {
    setIsOpen(false);
    if (slug) {
      router.push(`/product/${slug}`);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Form
        action="/search"
        onSubmit={() => setIsOpen(false)}
        className="w-full"
      >
        <div className="relative flex w-full items-center">
          {isLoading ? (
            <Loader2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#0284C7]" />
          ) : (
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          )}

          <input
            ref={inputRef}
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results.length > 0 && query.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            autoComplete="off"
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

      {/* Floating Live Autocomplete Dropdown */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-[#BAE6FD] bg-white shadow-xl shadow-sky-950/10 backdrop-blur-md">
          {results.length === 0 && !isLoading ? (
            <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-slate-400" />
              <span>Tidak ditemukan produk untuk &ldquo;{query}&rdquo;</span>
            </div>
          ) : (
            <div>
              <div className="px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex justify-between items-center">
                <span>Hasil Saran ({results.length})</span>
                <span className="text-[10px] font-normal text-slate-400">Tekan Enter untuk cari</span>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {results.map((product) => {
                  const isOutOfStock = product.stock != null && product.stock <= 0;
                  return (
                    <button
                      key={product._id}
                      type="button"
                      onClick={() => handleSelectProduct(product.slug?.current)}
                      className="w-full p-2.5 sm:p-3 flex items-center gap-3 text-left hover:bg-sky-50/70 transition-colors group"
                    >
                      <div className="relative w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                        {product.image && (
                          <Image
                            src={imageUrl(product.image).url()}
                            alt={product.name ?? "Product thumbnail"}
                            fill
                            className="object-contain p-1"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-[#0284C7] transition-colors">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-mono font-bold text-slate-900">
                            {formatIDR(product.price ?? 0)}
                          </span>
                          {isOutOfStock ? (
                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                              Habis
                            </span>
                          ) : product.stock != null && product.stock <= 5 ? (
                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-amber-50 text-amber-700">
                              Sisa {product.stock}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0284C7] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  );
                })}
              </div>

              <div className="p-2 border-t border-slate-100 bg-slate-50/70">
                <Link
                  href={`/search?query=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-[#0284C7] hover:underline"
                >
                  <span>Lihat semua hasil untuk &ldquo;{query}&rdquo;</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
