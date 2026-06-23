export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-26'

// Export dataset and projectId with safe fallbacks to avoid throwing at import time
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
