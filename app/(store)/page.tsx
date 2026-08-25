import BlackFridayBanner from "@/components/BlackFridayBanner";
import TrustBar from "@/components/TrustBar";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60;

export default async function Home() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* Dynamic Sanity CMS Sale Banner (managed in Sanity Studio) */}
        <BlackFridayBanner />
        <TrustBar />
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
