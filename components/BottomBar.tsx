"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Package, ShoppingCart } from "lucide-react";
import useBasketStore from "@/store/store";

const tabs = [
  { href: "/", label: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/categories",
    label: "Categories",
    icon: LayoutGrid,
    match: (p: string) => p.startsWith("/categories"),
  },
  {
    href: "/basket",
    label: "Basket",
    icon: ShoppingCart,
    match: (p: string) => p.startsWith("/basket"),
    badge: true,
  },
  {
    href: "/orders",
    label: "Orders",
    icon: Package,
    match: (p: string) => p.startsWith("/orders"),
  },
];

function BottomBar() {
  const pathname = usePathname();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  // The basket page has its own fixed bottom checkout bar
  if (pathname.startsWith("/basket")) return null;

  return (
    <>
      {/* Spacer so page content is not covered by the fixed bar */}
      <div className="h-16 md:hidden" aria-hidden />

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#BAE6FD]/70 bg-white/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden shadow-lg">
        <div className="grid h-16 grid-cols-4">
          {tabs.map(({ href, label, icon: Icon, match, badge }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${active ? "text-[#0284C7] font-bold" : "text-slate-500 hover:text-slate-800"}`}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" />
                  {badge && itemCount > 0 && (
                    <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] px-1 text-[10px] font-mono font-bold text-white shadow-sm shadow-sky-500/30">
                      {itemCount}
                    </span>
                  )}
                </span>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default BottomBar;
