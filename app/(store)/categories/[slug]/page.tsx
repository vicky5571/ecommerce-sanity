import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

export const dynamic = "force-static";
export const revalidate = 60;

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [products, categories] = await Promise.all([
    getProductsByCategory(slug),
    getAllCategories(),
  ]);

  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="mb-6 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-xs">
          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7] font-semibold text-xs tracking-wider uppercase mb-2 border border-[#BAE6FD]">
            Kategori
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Menampilkan {products.length} produk pilihan dalam kategori ini
          </p>
        </div>

        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default CategoryPage;
