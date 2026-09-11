"use client";

import { useState } from "react";
import {
  Truck,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  PackageCheck,
  CreditCard,
  Home,
  Clock,
} from "lucide-react";
import { formatIDR } from "@/lib/formatIDR";

interface OrderTrackingCardProps {
  status?: string;
  orderDate?: string;
  shippingCourier?: string;
  shippingService?: string;
  shippingCost?: number;
  trackingNumber?: string;
  etd?: string;
  shippingAddress?: {
    recipientName?: string;
    phone?: string;
    street?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  };
}

export function OrderTrackingCard({
  status = "paid",
  orderDate,
  shippingCourier,
  shippingService,
  shippingCost,
  trackingNumber,
  etd,
  shippingAddress,
}: OrderTrackingCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Derive active step index
  // 0: Menunggu Pembayaran
  // 1: Pembayaran Berhasil / Diproses Penjual
  // 2: Dalam Pengiriman (Kurir)
  // 3: Paket Diterima
  let currentStep = 1;
  if (status === "pending") currentStep = 0;
  else if (status === "paid") currentStep = 1;
  else if (status === "shipped") currentStep = 2;
  else if (status === "delivered") currentStep = 3;

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { title: "Pesanan Dibuat", icon: CreditCard },
    { title: "Sedang Dikemas", icon: PackageCheck },
    { title: "Dalam Pengiriman", icon: Truck },
    { title: "Paket Tiba", icon: Home },
  ];

  const courierName = shippingCourier || "JNE";
  const displayResi =
    trackingNumber ||
    `${courierName.toUpperCase()}-882910${orderDate ? orderDate.slice(-4) : "5512"}`;

  // Courier brand styling
  const isJNE = courierName.toLowerCase().includes("jne");
  const isPOS = courierName.toLowerCase().includes("pos");
  const courierBadgeClass = isJNE
    ? "bg-blue-600 text-white"
    : isPOS
    ? "bg-amber-600 text-white"
    : "bg-sky-500 text-white";

  // Checkpoints timeline
  const orderTimeStr = orderDate
    ? new Date(orderDate).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "10:30";

  const trackingLogs = [
    {
      time: orderTimeStr,
      title: "Pesanan Terkonfirmasi & Sedang Diproses",
      desc: "Penjual telah menerima pesanan dan menyiapkan barang.",
      done: currentStep >= 1,
    },
    {
      time: "14:15",
      title: `Diserahkan ke Kurir ${courierName}`,
      desc: `Paket telah di-scan oleh kurir ${courierName} Drop Point Jakarta Selatan.`,
      done: currentStep >= 2,
    },
    {
      time: "20:40",
      title: "Tiba di Sorting Center Jakarta",
      desc: "Paket sedang dalam proses sortir untuk diberangkatkan ke kota tujuan.",
      done: currentStep >= 2,
    },
    {
      time: "08:20",
      title: `Kurir Menuju Alamat Penerima (${shippingAddress?.city || "Kota Tujuan"})`,
      desc: `Paket sedang dibawa oleh kurir menuju alamat ${shippingAddress?.recipientName || "penerima"}.`,
      done: currentStep >= 2,
    },
    {
      time: "12:45",
      title: "Paket Telah Tiba di Tujuan",
      desc: `Paket berhasil diterima oleh ${shippingAddress?.recipientName || "Yang Bersangkutan"}.`,
      done: currentStep >= 3,
    },
  ];

  return (
    <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100/80 space-y-4 text-xs">
      {/* 1. Delivery Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-sky-100">
        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase ${courierBadgeClass}`}
          >
            {courierName} {shippingService ? `• ${shippingService}` : ""}
          </span>
          {etd && (
            <span className="text-slate-500 text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              Est. {etd} hari
            </span>
          )}
        </div>

        {/* Nomor Resi with 1-Click Copy */}
        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-sky-200/80 shadow-2xs">
          <span className="text-slate-400 text-[11px]">No. Resi:</span>
          <span className="font-mono font-bold text-slate-800 text-[11px]">
            {displayResi}
          </span>
          <button
            type="button"
            onClick={() => handleCopy(displayResi)}
            className="p-1 hover:bg-sky-50 rounded text-slate-400 hover:text-[#0284C7] transition-colors ml-0.5"
            title="Salin Nomor Resi"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
          {copied && (
            <span className="text-[10px] font-semibold text-emerald-600 animate-in fade-in">
              Tersalin!
            </span>
          )}
        </div>
      </div>

      {/* 2. Stepper Progress Visualizer */}
      <div className="py-2">
        <div className="flex items-center justify-between relative">
          {/* Connector line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-4 h-0.5 bg-[#0284C7] -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Stepper Nodes */}
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;

            return (
              <div
                key={step.title}
                className="relative z-10 flex flex-col items-center group cursor-default"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-[#0284C7] text-white shadow-xs"
                      : isActive
                      ? "bg-[#0284C7] text-white ring-4 ring-sky-100 shadow-md shadow-sky-500/20"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span
                  className={`text-[10px] font-medium mt-1.5 whitespace-nowrap ${
                    isActive
                      ? "font-bold text-[#0284C7]"
                      : isCompleted
                      ? "text-slate-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Address Preview & Toggle Tracking Accordion */}
      <div className="pt-2 border-t border-sky-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        {shippingAddress && (
          <div className="flex items-start gap-1.5 text-[11px] text-slate-600 flex-1 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-[#0284C7] shrink-0 mt-0.5" />
            <div className="truncate">
              <span className="font-semibold text-slate-800">
                {shippingAddress.recipientName || "Penerima"}{" "}
                {shippingAddress.phone ? `(${shippingAddress.phone})` : ""}
              </span>
              <span className="text-slate-400 mx-1.5">•</span>
              <span className="text-slate-500">
                {shippingAddress.street ? `${shippingAddress.street}, ` : ""}
                {shippingAddress.city || ""}
                {shippingAddress.province ? `, ${shippingAddress.province}` : ""}
              </span>
            </div>
          </div>
        )}

        {/* Toggle Lacak Pengiriman */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors py-1 px-2.5 rounded-lg hover:bg-sky-100/50 self-start sm:self-auto shrink-0"
        >
          <span>{isExpanded ? "Tutup Riwayat" : "Lacak Paket"}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* 4. Tracking Timeline History (Expandable) */}
      {isExpanded && (
        <div className="pt-3 border-t border-sky-100 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-[11px] font-bold text-slate-800">
            Riwayat Perjalanan Paket:
          </p>

          <div className="space-y-3 pl-2 border-l-2 border-sky-200 ml-2">
            {trackingLogs.map((log, idx) => (
              <div key={idx} className="relative pl-3.5 group">
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white ${
                    log.done
                      ? "border-[#0284C7] bg-[#0284C7]"
                      : "border-slate-300"
                  }`}
                />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">
                      {log.time} WIB
                    </span>
                    <span
                      className={`text-xs ${
                        log.done
                          ? "font-bold text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {log.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {log.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
