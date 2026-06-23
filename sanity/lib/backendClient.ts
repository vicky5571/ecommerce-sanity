import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

let backendClient: any;
if (projectId && dataset) {
  backendClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token: process.env.SANITY_API_TOKEN,
  });
} else {
  backendClient = {
    config: () => ({ projectId, dataset, apiVersion }),
    withConfig: () => backendClient,
    create: async () => {
      throw new Error("Sanity projectId/dataset not set");
    },
    fetch: async () => {
      throw new Error("Sanity projectId/dataset not set");
    },
  };
}

export { backendClient };
