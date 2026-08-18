import Link from "next/link";
import { Category } from "@/sanity.types";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 seconds

async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Browse Categories</h1>

        {categories.length === 0 ? (
          <p className="text-center text-gray-600">No categories found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {categories.map((category: Category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug?.current}`}
                className="group flex flex-col items-start rounded-lg border border-gray-200 bg-white p-3 sm:p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <h2 className="text-sm sm:text-base font-semibold text-gray-800 transition-colors group-hover:text-blue-500">{category.title}</h2>
                {category.description && <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">{category.description}</p>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;
