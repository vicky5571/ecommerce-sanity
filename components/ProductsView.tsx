import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";
import CategoryPills from "./CategoryPills";
import { Grid } from "lucide-react";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="w-full space-y-6">
      {/* Category Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#BAE6FD]/70">
        <div className="flex-1 w-full sm:w-auto">
          <CategoryPills categories={categories} />
        </div>
        <div className="w-full sm:w-[220px] shrink-0">
          <CategorySelectorComponent categories={categories} />
        </div>
      </div>

      {/* Main Catalog Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-[#E0F2FE] text-[#0284C7]">
              <Grid className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Koleksi Produk
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono font-medium">
            {products.length} barang
          </span>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default ProductsView;
