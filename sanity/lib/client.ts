import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// If projectId/dataset are not set, export a safe stub client to avoid
// throwing during build/collect step. This is a temporary safeguard so
// builds can run without env vars configured.
let client: any;
if (projectId && dataset) {
  client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    stega: {
      studioUrl: process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}/studio` : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
    },
  });
} else {
  client = {
    config: () => ({ projectId, dataset, apiVersion }),
    withConfig: () => client,
    fetch: async () => {
      throw new Error("Sanity projectId/dataset not set");
    },
    create: async () => {
      throw new Error("Sanity projectId/dataset not set");
    },
    patch: () => {
      throw new Error("Sanity projectId/dataset not set");
    },
    delete: async () => {
      throw new Error("Sanity projectId/dataset not set");
    },
    live: {
      events: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
    },
  };
}

export { client };
