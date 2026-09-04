"use server";

import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

export async function searchProductsAction(query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results = await searchProductsByName(query.trim());
  return results.slice(0, 5);
}

