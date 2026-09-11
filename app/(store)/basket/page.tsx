"use client";

import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import {
  createCheckoutSession,
  Metadata,
  ShippingDetails,
} from "@/actions/createCheckoutSession";
import { formatIDR } from "@/lib/formatIDR";
import {
  ShoppingBag,
  Trash2,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Lock,
  Truck,
  MapPin,
  User as UserIcon,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { POPULAR_CITIES } from "@/lib/rajaongkirCities";
import { ShippingServiceOption } from "@/app/api/shipping/cost/route";

function BasketPage() {
  // All Hooks MUST be called at top-level unconditionally
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { addItem, removeItem, deleteItem, clearBasket } = useBasketStore();
  const subtotalPrice = useBasketStore((state) => state.getTotalPrice());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Shipping Form State
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<string>("444"); // Surabaya default
  const [shippingServices, setShippingServices] = useState<ShippingServiceOption[]>([]);
  const [selectedService, setSelectedService] = useState<ShippingServiceOption | null>(null);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);
  const [shippingError, setShippingError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pre-fill user data once loaded
  useEffect(() => {
    if (user && !recipientName) {
      setRecipientName(user.fullName || "");
    }
  }, [user, recipientName]);

  // Fetch shipping cost from RajaOngkir when selectedCityId changes
  useEffect(() => {
    if (!selectedCityId) return;

    let isMounted = true;
    async function fetchShipping() {
      setIsLoadingShipping(true);
      setShippingError(null);

      try {
        const res = await fetch("/api/shipping/cost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination: selectedCityId,
            courier: "all",
          }),
        });

        if (!res.ok) {
          throw new Error(`Gagal memuat tarif ongkir (${res.status})`);
        }

        const data = await res.json();
        if (isMounted) {
          const services: ShippingServiceOption[] = data.services || [];
          setShippingServices(services);
          if (services.length > 0) {
            setSelectedService(services[0]);
          } else {
            setSelectedService(null);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Error fetching shipping cost:", err);
          setShippingError("Tidak dapat memuat ongkos kirim. Silakan coba lagi.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingShipping(false);
        }
      }
    }

    fetchShipping();

    return () => {
      isMounted = false;
    };
  }, [selectedCityId]);

  // Early returns only AFTER all hooks have been declared
  if (!isClient) {
    return <Loader />;
  }

  // 1. Rich Empty State with Action CTA
  if (groupedItems.length === 0) {
    return (
      <div className="bg-background min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-sm space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center mx-auto shadow-sm">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Wah, keranjang belanjamu kosong!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              Yuk, jelajahi katalog produk pilihan kami dan temukan barang favoritmu sekarang juga.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold text-sm transition-all shadow-md shadow-sky-500/25 hover:scale-[1.02]"
          >
            <span>Mulai Belanja Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const selectedCityObj =
    POPULAR_CITIES.find((c) => c.city_id === selectedCityId) || POPULAR_CITIES[0];

  const handleCheckout = async () => {
    if (!isSignedIn) return;

    if (!selectedService) {
      alert("Silakan pilih opsi layanan pengiriman terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    try {
      const primaryEmail = user?.emailAddresses?.[0];
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: recipientName.trim() || user?.fullName || "Pelanggan",
        customerEmail: primaryEmail
          ? ((primaryEmail as any).emailAddress ??
            (primaryEmail as any).email ??
            "Unknown")
          : "Unknown",
        clerkUserId: user?.id ?? "Unknown",
      };

      const shippingDetails: ShippingDetails = {
        recipientName: recipientName.trim() || user?.fullName || "Pelanggan",
        phone: phone.trim() || "-",
        street: streetAddress.trim() || "Alamat Pengiriman",
        city: `${selectedCityObj.type} ${selectedCityObj.city_name}`,
        province: selectedCityObj.province,
        postalCode: selectedCityObj.postal_code,
        courierCode: selectedService.courierCode,
        courierName: selectedService.courierName,
        service: selectedService.service,
        cost: selectedService.cost,
        etd: selectedService.etd,
      };

      const checkoutUrl = await createCheckoutSession(
        groupedItems,
        metadata,
        shippingDetails
      );

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
      try {
        const msg = error instanceof Error ? error.message : JSON.stringify(error);
        alert("Checkout error: " + msg);
      } catch (e) {
        // ignore
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalQuantity = groupedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const shippingFee = selectedService?.cost || 0;
  const grandTotalPrice = subtotalPrice + shippingFee;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-16">
        {/* Header Title & Clear Action */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Keranjang Belanja
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {totalQuantity} barang dalam pesanan Anda
            </p>
          </div>
          <button
            type="button"
            onClick={clearBasket}
            className="text-xs text-stone-500 hover:text-red-600 transition-colors flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Kosongkan Keranjang</span>
          </button>
        </div>

        {/* 2-Column Cart & Summary Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of Items + Shipping Selector */}
          <div className="lg:col-span-8 space-y-6">
            {/* List of Products */}
            <div className="space-y-3">
              {groupedItems.map((item) => {
                const itemTotal = (item.product.price ?? 0) * item.quantity;
                return (
                  <div
                    key={item.product._id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#BAE6FD]/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#38BDF8]"
                  >
                    {/* Thumbnail & Product Details */}
                    <div
                      className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                      onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-sky-50/40 p-2 border border-[#BAE6FD]/60 flex-shrink-0 relative overflow-hidden">
                        {item.product.image && (
                          <Image
                            src={imageUrl(item.product.image).url()}
                            alt={item.product.name ?? "Product image"}
                            fill
                            className="object-contain"
                          />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm font-bold text-slate-900 truncate hover:text-[#0284C7] transition-colors">
                          {item.product.name}
                        </h2>

                        {/* Unit Price Breakdown */}
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          @ {formatIDR(item.product.price ?? 0)} × {item.quantity}
                        </p>

                        {/* Subtotal */}
                        <p className="text-sm font-mono font-extrabold text-[#0284C7] mt-1.5">
                          {formatIDR(itemTotal)}
                        </p>
                      </div>
                    </div>

                    {/* Actions: Stepper + Trash Delete Icon */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#BAE6FD] rounded-full overflow-hidden bg-slate-50">
                        <button
                          type="button"
                          onClick={() => removeItem(item.product._id)}
                          className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7] font-bold transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-xs text-slate-900 bg-white py-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={
                            item.product.stock != null && item.quantity >= item.product.stock
                          }
                          onClick={() => addItem(item.product)}
                          className={`w-7 h-7 flex items-center justify-center font-bold transition-colors ${
                            item.product.stock != null && item.quantity >= item.product.stock
                              ? "text-slate-300 cursor-not-allowed bg-slate-100"
                              : "text-slate-700 hover:bg-[#E0F2FE] hover:text-[#0284C7]"
                          }`}
                          title={
                            item.product.stock != null && item.quantity >= item.product.stock
                              ? "Maksimal stok tercapai"
                              : "Tambah barang"
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Delete Item Trash Button */}
                      <button
                        type="button"
                        onClick={() => deleteItem(item.product._id)}
                        aria-label="Hapus barang"
                        className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery & Address Information (RajaOngkir) */}
            <div className="p-6 rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      Pengiriman &amp; Alamat Tujuan
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Kalkulasi ongkos kirim otomatis via RajaOngkir (JNE, POS, TIKI)
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  Asal: Jakarta Selatan
                </span>
              </div>

              {/* Form Inputs: Recipient, Phone, City, Street */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Recipient Name */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 flex items-center gap-1">
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nama Penerima</span>
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Contoh: Vicky Al-Fajr"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 transition-all text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>No. WhatsApp / Handphone</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 transition-all text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* City Destination Selector */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Kota / Kabupaten Tujuan (RajaOngkir)</span>
                  </label>
                  <select
                    value={selectedCityId}
                    onChange={(e) => setSelectedCityId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 transition-all text-slate-900 bg-slate-50/50 font-medium"
                  >
                    {POPULAR_CITIES.map((city) => (
                      <option key={`${city.city_id}-${city.province_id}`} value={city.city_id}>
                        {city.type} {city.city_name} — {city.province} ({city.postal_code})
                      </option>
                    ))}
                  </select>

                </div>

                {/* Street Address */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">
                    Alamat Lengkap (Jalan, No. Rumah, RT/RW, Patokan)
                  </label>
                  <textarea
                    rows={2}
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Contoh: Jl. Diponegoro No. 45, RT 02/05, Dekat Minimarket"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-sky-100 transition-all text-slate-900 bg-slate-50/50 resize-none"
                  />
                </div>
              </div>

              {/* Courier & Shipping Options */}
              <div className="pt-2 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Pilih Layanan Kurir Pengiriman:
                  </span>
                  {isLoadingShipping && (
                    <span className="text-[11px] text-[#0284C7] flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Memuat tarif...
                    </span>
                  )}
                </div>

                {shippingError && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{shippingError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {shippingServices.map((service, index) => {
                    const isSelected =
                      selectedService?.courierCode === service.courierCode &&
                      selectedService?.service === service.service;

                    // Courier badge styling
                    const isJNE = service.courierCode.toLowerCase() === "jne";
                    const isPOS = service.courierCode.toLowerCase() === "pos";
                    const badgeColor = isJNE
                      ? "bg-blue-600 text-white"
                      : isPOS
                      ? "bg-amber-600 text-white"
                      : "bg-sky-500 text-white";

                    return (
                      <div
                        key={`${service.courierCode}-${service.service}-${index}`}
                        onClick={() => setSelectedService(service)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-[#0284C7] bg-[#E0F2FE]/40 ring-2 ring-sky-200/60 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${badgeColor}`}
                          >
                            {service.courierCode}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs text-slate-900">
                                {service.service}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                ({service.etd} hari)
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {service.description || "Layanan Reguler"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#0284C7]">
                            {formatIDR(service.cost)}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? "border-[#0284C7] bg-[#0284C7] text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary Card (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="p-6 rounded-3xl bg-white border border-[#BAE6FD]/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Ringkasan Belanja
              </h3>

              <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal ({totalQuantity} barang)</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {formatIDR(subtotalPrice)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Biaya Pengiriman</span>
                  {selectedService ? (
                    <span className="font-mono font-semibold text-[#0284C7]">
                      {formatIDR(shippingFee)}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium text-[11px]">
                      Belum dipilih
                    </span>
                  )}
                </div>

                {selectedService && (
                  <div className="text-[11px] text-slate-400 flex justify-between">
                    <span>Kurir Terpilih</span>
                    <span className="font-medium text-slate-600">
                      {selectedService.courierName} ({selectedService.service})
                    </span>
                  </div>
                )}
              </div>

              {/* Total Tagihan */}
              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">
                  Total Tagihan
                </span>
                <span className="text-xl font-mono font-extrabold text-slate-950">
                  {formatIDR(grandTotalPrice)}
                </span>
              </div>

              {/* Checkout CTA */}
              {isSignedIn ? (
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isLoading || !selectedService}
                  className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isLoading ? "Memproses..." : "Lanjut ke Pembayaran"}
                  </span>
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01]"
                  >
                    Masuk untuk Checkout
                  </button>
                </SignInButton>
              )}

              {/* Trust Footnote */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Transaksi 100% Aman &amp; Terenkripsi Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketPage;
