import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
// import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 seconds

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // For debugging, everytime it purges the cache and creates a new page
  console.log(crypto.randomUUID().slice(0, 5) + `>>> Rendered the home page cache with ${products.length} products and ${categories.length} categories`);

  return (
    <div className="bg-background min-h-screen">
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
