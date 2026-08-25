import { Product } from "@/sanity.types";
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 mt-2">
      {products?.map((product) => (
        <ProductThumb key={product._id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
