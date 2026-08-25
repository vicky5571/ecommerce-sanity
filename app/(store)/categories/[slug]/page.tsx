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
        <div className="mb-6 p-4 sm:p-6 rounded-xl bg-white border border-stone-200/90 shadow-2xs">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Kategori</p>
          <h1 className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight mt-0.5">
            {categoryName}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Menampilkan {products.length} produk dalam kategori ini
          </p>
        </div>

        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default CategoryPage;
