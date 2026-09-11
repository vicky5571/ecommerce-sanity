import { NextRequest, NextResponse } from "next/server";

export interface ShippingServiceOption {
  courierCode: string; // "jne" | "pos" | "tiki"
  courierName: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
  isFallback?: boolean;
}

const FALLBACK_RATES: ShippingServiceOption[] = [
  {
    courierCode: "jne",
    courierName: "JNE",
    service: "REG",
    description: "Layanan Reguler",
    cost: 18000,
    etd: "2-3",
    isFallback: true,
  },
  {
    courierCode: "jne",
    courierName: "JNE",
    service: "YES",
    description: "Yakin Esok Sampai",
    cost: 32000,
    etd: "1-1",
    isFallback: true,
  },
  {
    courierCode: "pos",
    courierName: "POS Indonesia",
    service: "Pos Reguler",
    description: "Pos Reguler Dalam Negeri",
    cost: 15000,
    etd: "2-4",
    isFallback: true,
  },
  {
    courierCode: "tiki",
    courierName: "TIKI",
    service: "REG",
    description: "Regular Service",
    cost: 17000,
    etd: "2-3",
    isFallback: true,
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      destination,
      origin = process.env.RAJAONGKIR_ORIGIN_CITY_ID || "153", // Jakarta Selatan default
      weight = 1000, // 1 kg default
      courier = "jne",
    } = body;

    if (!destination) {
      return NextResponse.json(
        { error: "Kota tujuan (destination) wajib diisi" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RAJAONGKIR_API_KEY;

    // If no API key configured yet, return realistic mock options
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        source: "mock_fallback",
        message: "Menggunakan data simulasi (RAJAONGKIR_API_KEY belum dikonfigurasi)",
        services: FALLBACK_RATES,
      });
    }

    // Call RajaOngkir Starter API
    const couriersToQuery = courier === "all" ? ["jne", "pos", "tiki"] : [courier];
    const results: ShippingServiceOption[] = [];

    for (const c of couriersToQuery) {
      try {
        const formData = new URLSearchParams();
        formData.append("origin", String(origin));
        formData.append("destination", String(destination));
        formData.append("weight", String(weight));
        formData.append("courier", c);

        const response = await fetch("https://api.rajaongkir.com/starter/cost", {
          method: "POST",
          headers: {
            key: apiKey,
            "content-type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          const courierData = data?.rajaongkir?.results?.[0];
          const costs = courierData?.costs || [];

          for (const item of costs) {
            const costVal = item.cost?.[0]?.value ?? 0;
            const etdVal = item.cost?.[0]?.etd ?? "-";

            results.push({
              courierCode: c,
              courierName: courierData?.name || c.toUpperCase(),
              service: item.service,
              description: item.description,
              cost: costVal,
              etd: etdVal,
            });
          }
        } else {
          console.warn(`RajaOngkir request failed for ${c} with status ${response.status}`);
        }
      } catch (subErr) {
        console.warn(`Error querying RajaOngkir for ${c}:`, subErr);
      }
    }

    // If real API returned services, use them; otherwise fallback
    if (results.length > 0) {
      return NextResponse.json({
        success: true,
        source: "rajaongkir_live",
        services: results,
      });
    }

    return NextResponse.json({
      success: true,
      source: "mock_fallback",
      message: "RajaOngkir tidak merespon, menggunakan estimasi simulasi",
      services: FALLBACK_RATES,
    });
  } catch (error) {
    console.error("Error in /api/shipping/cost:", error);
    return NextResponse.json({
      success: true,
      source: "mock_fallback",
      services: FALLBACK_RATES,
    });
  }
}
