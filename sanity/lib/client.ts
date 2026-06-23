import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    // Check node.env if production then vercel url/studio else the other
    studioUrl: process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}/studio` : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,

    // studioUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/studio` : `http://${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  },
});
