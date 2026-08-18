import { imageUrl } from "@/lib/imageUrl";
import { formatIDR } from "@/lib/formatIDR";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "next-sanity";
// import { Button } from "@/components/ui/button";
import AddToBasketButton from "@/components/AddToBasket";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 seconds

async function ProductPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // For debugging, everytime it purges the cache and creates a new page
  console.log(crypto.randomUUID().slice(0, 5) + `>>> Rendered the product page cache for ${slug}`);

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}>
          {product.image && <Image src={imageUrl(product.image).url()} alt={product.name ?? "Product Image"} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain transition-transform duration-300 hover:scale-105" />}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{product.name}</h1>
            <div className="text-lg sm:text-xl font-bold mb-4">{formatIDR(product.price ?? 0)}</div>
            <div className="prose max-w-none mb-6">{Array.isArray(product.description) && <PortableText value={product.description} />}</div>
          </div>

          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
