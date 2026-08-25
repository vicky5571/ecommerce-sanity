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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80">
        <div className="flex-1 w-full sm:w-auto">
          <CategoryPills categories={categories} />
        </div>
        <div className="w-full sm:w-[220px] shrink-0">
          <CategorySelectorComponent categories={categories} />
        </div>
      </div>

      {/* Main Catalog Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#E8F8EA] text-[#03AC0E]">
              <Grid className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
              Koleksi Produk
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            {products.length} barang
          </span>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default ProductsView;
