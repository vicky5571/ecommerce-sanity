import type { Metadata } from "next";
import { Poppins, Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderClerk from "@/components/HeaderClerk";
import HeaderFallback from "@/components/HeaderFallback";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/DisableDraftMode";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "StealtForce | Toko Online Fashion & Lifestyle Terpercaya",
    template: "%s | StealtForce",
  },
  description:
    "Belanja fashion, apparel, dan perlengkapan harian berkualitas dengan 100% jaminan original, garansi retur, dan transaksi aman di StealtForce.",
  keywords: [
    "StealtForce",
    "ecommerce indonesia",
    "toko online",
    "fashion online",
    "baju original",
    "lifestyle",
  ],
  authors: [{ name: "StealtForce" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName: "StealtForce",
    title: "StealtForce | Toko Online Fashion & Lifestyle Terpercaya",
    description:
      "Belanja fashion dan perlengkapan harian original berkualitas dengan pembayaran aman dan pengiriman cepat.",
  },
  twitter: {
    card: "summary_large_image",
    title: "StealtForce | Toko Online Fashion & Lifestyle Terpercaya",
    description:
      "Belanja fashion dan perlengkapan harian original berkualitas dengan transaksi aman di StealtForce.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const content = (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
        <main className="min-h-screen flex flex-col justify-between">
          <div>
            {clerkPublishableKey ? <HeaderClerk /> : <HeaderFallback />}
            {children}
          </div>
          <Footer />
          <BottomBar />
        </main>
        <SanityLive />
      </body>
    </html>
  );

  // Provide a safe fallback publishable key so client hooks don't throw during build.
  const publishableKey =
    clerkPublishableKey ?? "local_fallback_publishable_key";

  return (
    <ClerkProvider publishableKey={publishableKey} dynamic>
      {content}
    </ClerkProvider>
  );
}
