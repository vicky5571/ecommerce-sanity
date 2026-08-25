"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, ArrowRight, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };
  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Upper Value & Trust Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Fast Nationwide Dispatch</p>
                <p className="text-xs text-slate-400">Reliable express delivery across Indonesia</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">100% Authentic Guarantee</p>
                <p className="text-xs text-slate-400">Directly sourced premium apparel & goods</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3.5">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Encrypted Stripe Checkout</p>
                <p className="text-xs text-slate-400">Protected by 256-bit SSL security</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Architectural Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column & Newsletter */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-white uppercase font-sans">
                  Stealt<span className="text-blue-500">Force</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Sparkles className="w-2.5 h-2.5" /> Official
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-sm">
                Engineered everyday wear and essentials designed with tactile materials and meticulous durability. Built for movement, crafted to endure.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6 pt-6 border-t border-slate-800/80">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Subscribe to the Inner Dispatch
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Receive private release announcements, curated drops, and exclusive discounts.
              </p>
              {subscribed ? (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 rounded-md">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Thank you for subscribing to the Inner Dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3 flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-slate-900 text-sm text-white placeholder-slate-500 px-3.5 py-2.5 rounded-l-md border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-r-md text-sm transition-colors flex items-center gap-1 shrink-0"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Link Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Storefront */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Shop & Explore</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-slate-400 hover:text-white transition-colors">
                    Featured Categories
                  </Link>
                </li>
                <li>
                  <Link href="/search?query=" className="text-slate-400 hover:text-white transition-colors">
                    Product Search
                  </Link>
                </li>
                <li>
                  <Link href="/basket" className="text-slate-400 hover:text-white transition-colors">
                    Shopping Basket
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Orders & Help */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Customer Support</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/orders" className="text-slate-400 hover:text-white transition-colors">
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
                    Shipping Policy (IDR)
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
                    Returns & Exchanges
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
                    Payment Guidelines
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 3: Platform & Studio */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Admin & Platform</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/studio" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                    <span>Sanity Studio</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">CMS</span>
                  </Link>
                </li>
                <li>
                  <Link href="/draft-mode/enable" className="text-slate-400 hover:text-white transition-colors">
                    Draft Mode Preview
                  </Link>
                </li>
                <li>
                  <span className="text-slate-500 text-xs block mt-2">
                    Currency: <span className="text-slate-300 font-semibold">IDR (Rp)</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Payment Badges & Legal Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
            <span className="text-slate-500 font-medium mr-1">Accepted Payments:</span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold tracking-wide">
              STRIPE
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold tracking-wide">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold tracking-wide">
              MASTERCARD
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-semibold tracking-wide">
              QRIS / IDR
            </span>
          </div>

          <div className="text-center md:text-right text-slate-400">
            <p>© {new Date().getFullYear()} StealtForce Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
