"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col items-center justify-center bg-sky-50 p-4 text-center font-sans">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-sm border border-sky-200 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Terjadi Kesalahan</h2>
          <p className="text-xs text-slate-500">{error?.message || "Terjadi kendala saat memuat halaman."}</p>
          <button
            onClick={() => reset()}
            className="rounded-full bg-gradient-to-r from-[#0284C7] to-[#38BDF8] px-6 py-2.5 text-xs font-bold text-white shadow-sm shadow-sky-500/25 transition-all hover:scale-105"
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}
