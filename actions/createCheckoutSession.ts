"use server";

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";
import { backendClient } from "@/sanity/lib/backendClient";
import { auth, currentUser } from "@clerk/nextjs/server";

export type ShippingDetails = {
  recipientName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode?: string;
  courierCode: string;
  courierName: string;
  service: string;
  cost: number;
  etd: string;
};

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  shippingDetails?: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata,
  shipping?: ShippingDetails
) {

  try {
    // 1. Authenticate user server-side and prevent user spoofing
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized: Anda harus login untuk melakukan checkout.");
    }

    const user = await currentUser();
    // Cryptographically enforce verified Clerk user ID and verified email
    metadata.clerkUserId = userId;
    if (user?.emailAddresses?.[0]?.emailAddress) {
      metadata.customerEmail = user.emailAddresses[0].emailAddress;
    }
    const verifiedFullName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "";
    if (verifiedFullName) {
      metadata.customerName = verifiedFullName;
    }
    // check if any grouped items don't have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Beberapa produk belum memiliki harga");
    }

    // Verify stock availability and price live against Sanity CMS
    const productIds = items.map((item) => item.product._id).filter(Boolean);
    if (productIds.length === 0) {
      throw new Error("Keranjang belanja kosong atau produk tidak valid.");
    }

    const liveProducts: Array<{ _id: string; name?: string; stock?: number; price?: number }> =
      await backendClient.fetch(
        `*[_type == "product" && _id in $productIds]{ _id, name, stock, price }`,
        { productIds }
      );

    for (const item of items) {
      const liveProduct = liveProducts.find((p) => p._id === item.product._id);
      if (!liveProduct) {
        throw new Error(
          `Produk "${item.product.name || "Product"}" tidak ditemukan di sistem.`
        );
      }
      if (liveProduct.stock != null) {
        if (liveProduct.stock <= 0) {
          throw new Error(
            `Produk "${liveProduct.name || item.product.name}" sudah habis (stok 0).`
          );
        }
        if (item.quantity > liveProduct.stock) {
          throw new Error(
            `Stok untuk "${liveProduct.name || item.product.name}" tidak mencukupi (tersisa ${liveProduct.stock}, dipesan ${item.quantity}).`
          );
        }
      }
    }

    // Search for existing customer by email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/basket`;

    // console.log(successUrl);

    const safeShipping = shipping
      ? {
          ...shipping,
          recipientName: (shipping.recipientName || "").slice(0, 50),
          phone: (shipping.phone || "").slice(0, 20),
          street: (shipping.street || "").slice(0, 150),
          city: (shipping.city || "").slice(0, 50),
          province: (shipping.province || "").slice(0, 40),
          postalCode: (shipping.postalCode || "").slice(0, 10),
          courierCode: (shipping.courierCode || "").slice(0, 10),
          courierName: (shipping.courierName || "").slice(0, 30),
          service: (shipping.service || "").slice(0, 20),
          etd: (shipping.etd || "").slice(0, 15),
        }
      : null;

    const shippingSerialized = safeShipping ? JSON.stringify(safeShipping) : "";

    const sessionMetadata: Record<string, string> = {
      orderNumber: metadata.orderNumber,
      customerName: (metadata.customerName || "Unknown").slice(0, 100),
      customerEmail: (metadata.customerEmail || "Unknown").slice(0, 100),
      clerkUserId: metadata.clerkUserId,
      shippingDetails: shippingSerialized.length <= 500 ? shippingSerialized : shippingSerialized.slice(0, 500),
    };


    const lineItems: any[] = items.map((item) => {
      const liveProduct = liveProducts.find((p) => p._id === item.product._id);
      const verifiedPrice = liveProduct?.price ?? 0;
      if (!verifiedPrice || verifiedPrice <= 0) {
        throw new Error(
          `Harga produk "${liveProduct?.name || item.product.name || "Product"}" tidak valid atau belum diatur.`
        );
      }

      return {
        price_data: {
          currency: "idr",
          unit_amount: Math.round(verifiedPrice * 100),
          product_data: {
            name: liveProduct?.name || item.product.name || "Product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
          },
        },
        quantity: item.quantity,
      };
    });

    if (shipping && shipping.cost > 0) {
      lineItems.push({
        price_data: {
          currency: "idr",
          unit_amount: Math.round(shipping.cost * 100),
          product_data: {
            name: `Ongkos Kirim (${shipping.courierName} - ${shipping.service})`,
            description: `Tujuan: ${shipping.city}, ${shipping.province} (Estimasi ${shipping.etd} hari)`,
          },
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata: sessionMetadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: lineItems,
    });


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
