"use client";

import { Category } from "@/sanity.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryPills({ categories }: { categories: Category[] }) {
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
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            isAll
              ? "bg-[#03AC0E] text-white shadow-xs"
              : "bg-white text-stone-700 hover:bg-[#E8F8EA] hover:text-[#03AC0E] border border-stone-200"
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#03AC0E] text-white shadow-xs"
                  : "bg-white text-stone-700 hover:bg-[#E8F8EA] hover:text-[#03AC0E] border border-stone-200"
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
