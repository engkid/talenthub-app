"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type CanonicalResult = {
  status: "success" | "failed" | "cancelled";
  code: string;
  ref?: string;
  message?: string;
  ts: string; // unix seconds string
};

export default function ResultClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hasReplaced, setHasReplaced] = useState(false);

  const canonical: CanonicalResult = useMemo(() => {
    const sp = searchParams;
    const rawStatus = (sp.get("status") || "").toLowerCase();
    const status: CanonicalResult["status"] =
      rawStatus === "success" || rawStatus === "ok"
        ? "success"
        : rawStatus === "cancelled" || rawStatus === "canceled"
        ? "cancelled"
        : rawStatus === "failed"
        ? "failed"
        : ((): CanonicalResult["status"] => {
            const okish = sp.get("ok") || sp.get("success") || sp.get("approved");
            if (okish && ["1", "true", "yes"].includes(okish.toLowerCase())) return "success";
            const cancelled = sp.get("cancel") || sp.get("cancelled") || sp.get("canceled");
            if (cancelled && ["1", "true", "yes"].includes(cancelled.toLowerCase())) return "cancelled";
            return "failed";
          })();

    const code =
      sp.get("code") ||
      sp.get("reason") ||
      sp.get("error") ||
      (status === "success" ? "SUCCESS" : status === "cancelled" ? "USER_CANCELLED" : "UNKNOWN_ERROR");

    const ref = sp.get("ref") || sp.get("reference") || sp.get("transaction_id") || sp.get("txid") || undefined;

    const message = sp.get("message") || sp.get("error_description") || sp.get("desc") || undefined;

    const ts = sp.get("ts") || String(Math.floor(Date.now() / 1000));

    return { status, code, ref, message, ts };
  }, [searchParams]);

  useEffect(() => {
    if (hasReplaced) return;
    const params = new URLSearchParams();
    params.set("status", canonical.status);
    params.set("code", canonical.code);
    if (canonical.ref) params.set("ref", canonical.ref);
    if (canonical.message) params.set("message", canonical.message);
    params.set("ts", canonical.ts);
    router.replace(`/result?${params.toString()}`);
    setHasReplaced(true);
  }, [canonical, hasReplaced, router]);

  const badgeClasses =
    canonical.status === "success"
      ? "bg-green-100 text-green-700"
      : canonical.status === "cancelled"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  const fullUrl = typeof window === "undefined" ? "" : window.location.href;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Result</h1>
        <span className={`inline-block px-2 py-1 rounded text-sm ${badgeClasses}`}>
          {canonical.status.toUpperCase()}
        </span>
      </div>

      <div className="text-left w-full max-w-xl">
        <ul className="space-y-2">
          <li className="border p-2 rounded">
            <LabelValue label="Code" value={canonical.code} />
          </li>
          {canonical.ref ? (
            <li className="border p-2 rounded">
              <LabelValue label="Reference" value={canonical.ref} />
            </li>
          ) : null}
          {canonical.message ? (
            <li className="border p-2 rounded">
              <LabelValue label="Message" value={canonical.message} />
            </li>
          ) : null}
          <li className="border p-2 rounded">
            <LabelValue label="Timestamp" value={canonical.ts} />
          </li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 break-all mb-2">{fullUrl}</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          >
            Back to Home
          </Link>
          <button
            type="button"
            onClick={() => {
              if (typeof window === "undefined") return;
              navigator.clipboard?.writeText(window.location.href);
            }}
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Copy URL
          </button>
        </div>
      </div>
    </div>
  );
}

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="w-28 shrink-0 text-sm text-gray-500">{label}</div>
      <div className="text-sm font-medium break-all">{value}</div>
    </div>
  );
}
