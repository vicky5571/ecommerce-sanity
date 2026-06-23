// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.

import "server-only";

import { defineLive } from "next-sanity";
import { client } from "./client";

// export const { sanityFetch, SanityLive } = defineLive({
//   client: client.withConfig({
//     // Live content is currently only available on the experimental API
//     // https://www.sanity.io/docs/api-versioning
//     apiVersion: "vX",
//   }),
// });

// Set your viewer token
const token = process.env.SANITY_API_READ_TOKEN;

let sanityFetch: any;
let SanityLive: any;

if (token) {
  const defined = defineLive({
    client,
    serverToken: token,
    browserToken: token,
    fetchOptions: { revalidate: 0 },
  });

  sanityFetch = defined.sanityFetch;
  SanityLive = defined.SanityLive;
} else {
  // Export safe fallbacks so builds don't fail when the read token isn't set.
  sanityFetch = async () => {
    throw new Error("SANITY_API_READ_TOKEN is not set");
  };
  // SanityLive is a React component; export a simple placeholder.
  SanityLive = () => null;
}

export { sanityFetch, SanityLive };
