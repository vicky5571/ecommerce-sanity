"use client";

import { Category } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryPills({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();
  const isAll = pathname === "/";

  const handleNav = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex items-center gap-2 min-w-max">
        <Link
          href="/"
          scroll={true}
          onClick={handleNav}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            isAll
              ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-sm shadow-sky-500/25 scale-[1.02]"
              : "bg-white text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7] border border-[#BAE6FD]/80"
          }`}
        >
          Semua Produk
        </Link>
        {categories.map((category) => {
          const active = pathname === `/categories/${category.slug?.current}`;
          return (
            <Link
              key={category._id}
              href={`/categories/${category.slug?.current}`}
              scroll={true}
              onClick={handleNav}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                active
                  ? "bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white shadow-sm shadow-sky-500/25 scale-[1.02]"
                  : "bg-white text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7] border border-[#BAE6FD]/80"
              }`}
            >
              {category.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
