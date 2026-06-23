"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
  try {
    console.log("createCheckoutSession called", { itemsCount: items.length, metadata });

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not configured");
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    // check if any grouped items don't have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Search for existing customer by email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    console.log("stripe.customers.list returned", { count: customers?.data?.length });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl = process.env.NODE_ENV === "production" ? `https://${process.env.VERCEL_URL}` : `${process.env.NEXT_PUBLIC_BASE_URL}`;
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/basket`;

    // console.log(successUrl);

    let session;
    try {
      session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: "idr",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
          },
        },
        quantity: item.quantity,
      })),
      });
    } catch (stripeErr: any) {
      console.error("Stripe session creation failed", stripeErr && stripeErr.raw ? stripeErr.raw : stripeErr);
      throw stripeErr;
    }

    console.log("Stripe session created", { id: session.id, url: session.url });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session", error);
    throw error;
  }
}

// successurl
// `${`${process.env.VERCEL_URL && `https:${process.env.VERCEL_URL}`} ` || process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`

// cancelurl
// `${`${process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`}` || process.env.NEXT_PUBLIC_BASE_URL}/basket`
