// import { apiVersion } from "@/sanity/env";
import Stripe from 'stripe';

let stripe: any;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
  });
} else {
  // Fallback stub to avoid throwing during build when the env var is missing.
  stripe = {
    webhooks: {
      constructEvent: () => {
        throw new Error('STRIPE_SECRET_KEY is not set');
      },
    },
    checkout: {
      sessions: {
        listLineItems: async () => {
          throw new Error('STRIPE_SECRET_KEY is not set');
        },
      },
    },
  };
}

export default stripe;
