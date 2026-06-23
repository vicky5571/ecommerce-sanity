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

    const currency = "IDR";

    // Currencies without minor units (amounts are specified in the major unit)
    const zeroDecimalCurrencies = new Set([
      "BIF",
      "CLP",
      "DJF",
      "GNF",
      "JPY",
      "KMF",
      "KRW",
      "MGA",
      "PYG",
      "RWF",
      "UGX",
      "VND",
      "VUV",
      "XAF",
      "XOF",
      "XPF",
      "IDR",
    ]);

    // Use the original product price as stored in Sanity (no markup applied)

    // Build line items and compute total in the currency's smallest unit
    const line_items = items.map((item) => {
      const rawPrice = Number(item.product.price ?? 0);
      const effectivePrice = rawPrice;

      const isZeroDecimal = zeroDecimalCurrencies.has(currency.toUpperCase());
      const unit_amount = isZeroDecimal ? Math.round(effectivePrice) : Math.round(effectivePrice * 100);

      return {
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount,
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product ID: ${item.product._id}`,
            metadata: { id: item.product._id },
            images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
          },
        },
        quantity: item.quantity,
        // attach debugging metadata so logs can show original values
        _debug: { rawPrice, effectivePrice, isZeroDecimal },
      };
    });

    const totalAmountSmallestUnit = line_items.reduce((sum, li) => sum + (li.price_data.unit_amount || 0) * (li.quantity || 0), 0);

    // Log line items and totals for debugging (will show what we send to Stripe)
    try {
      console.log(
        "checkout line_items:",
        JSON.stringify(
          line_items.map((li) => ({
            unit_amount: li.price_data.unit_amount,
            quantity: li.quantity,
            currency: li.price_data.currency,
            debug: (li as any)._debug,
          }))
        ),
        "totalSmallestUnit:",
        totalAmountSmallestUnit
      );
    } catch (e) {
      console.log("checkout line_items (error serializing)", e);
    }

    // Minimum thresholds (smallest unit). IDR ~ 9000 corresponds to ~$0.50 at common rates.
    const minimums: Record<string, number> = {
      USD: 50, // cents
      IDR: 9000,
    };

    const min = minimums[currency.toUpperCase()];
    if (min && totalAmountSmallestUnit < min) {
      throw new Error(`Order total is too small for ${currency.toUpperCase()}. Minimum order is ${min} ${currency.toUpperCase()} (approx $0.50).`);
    }

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
        line_items,
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
