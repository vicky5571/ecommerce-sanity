"use client";
import AddToBasketButton from "@/components/AddToBasket";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import { formatIDR } from "@/lib/formatIDR";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // wait for client to mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Your Basket</h1>
        <p className="text-gray-600 text-base sm:text-lg">Your basket is empty</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const primaryEmail = user?.emailAddresses?.[0];
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: primaryEmail ? ((primaryEmail as any).emailAddress ?? (primaryEmail as any).email ?? "Unknown") : "Unknown",
        clerkUserId: user?.id ?? "Unknown",
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
      try {
        const msg = error instanceof Error ? error.message : JSON.stringify(error);
        // Show a visible alert so failures are obvious in the browser
        // eslint-disable-next-line no-alert
        alert("Checkout error: " + msg);
      } catch (e) {
        // ignore alert failures
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4">Your Basket</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          {groupedItems?.map((item) => (
            <div key={item.product._id} className="mb-4 p-3 sm:p-4 border rounded flex items-center justify-between gap-3">
              <div className="flex items-center cursor-pointer flex-1 min-w-0" onClick={() => router.push(`/product/${item.product.slug?.current}`)}>
                <div className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 mr-3 sm:mr-4">
                  {item.product.image && <Image src={imageUrl(item.product.image).url()} alt={item.product.name ?? "Product image"} className="w-full h-full object-cover rounded" width={96} height={96} />}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-xl font-semibold truncate">{item.product.name}</h2>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{formatIDR((item.product.price ?? 0) * item.quantity)}</p>
                </div>
              </div>

              <div className="flex items-center flex-shrink-0">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-4 sm:p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 right-0 lg:right-auto z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] lg:shadow-none pb-[calc(1rem+env(safe-area-inset-bottom))] lg:pb-6">
          <h3 className="text-lg sm:text-xl font-semibold">Order Summary</h3>
          <div className="mt-3 sm:mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>{groupedItems.reduce((total, item) => total + item.quantity, 0)}</span>
            </p>
            <p className="flex justify-between text-xl sm:text-2xl font-bold border-t pt-2">
              <span>Total:</span>
              <span>{formatIDR(useBasketStore.getState().getTotalPrice())}</span>
            </p>
          </div>

          {isSignedIn ? (
            <button onClick={handleCheckout} disabled={isLoading} className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign in to Checkout</button>
            </SignInButton>
          )}
        </div>

        <div className="h-40 lg:h-0">{/* Spacer for fixed checkout on mobile */}</div>
      </div>
    </div>
  );
}

export default BasketPage;
