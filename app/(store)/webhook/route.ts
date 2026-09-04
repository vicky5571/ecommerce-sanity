import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
// import { error } from "console";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json({ error: "Stripe webhook secret is not set" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order created in sanity:", order);
    } catch (err) {
      console.error("Error creating order in Sanity:", err);
      return NextResponse.json({ error: "Error creating order" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const { id, amount_total, currency, metadata, payment_intent, customer, total_details } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const sanityProducts = lineItemsWithProduct.data.map((item: any) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  // Zero-decimal currencies where Stripe amount is already in major units (IDR is 2-decimal in Stripe)
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
  ]);

  const divisor = zeroDecimalCurrencies.has((currency ?? "").toUpperCase()) ? 1 : 100;

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / divisor : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / divisor : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  // Decrement stock for purchased products in Sanity
  await Promise.all(
    sanityProducts.map(async (item: any) => {
      const productId = item.product?._ref;
      const qty = item.quantity;
      if (!productId || qty <= 0) return;

      try {
        await backendClient
          .patch(productId)
          .setIfMissing({ stock: 0 })
          .dec({ stock: qty })
          .commit();
        console.log(`Decremented stock for product ${productId} by ${qty}`);
      } catch (stockError) {
        console.error(`Failed to decrement stock for product ${productId}:`, stockError);
      }
    })
  );

  return order;
}
