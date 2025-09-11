import DeepLinkButton from "@/components/DeepLinkButton";
import { fetchItems } from "@/lib/api";
import Link from "next/link";

export default async function Home() {
  let items: Awaited<ReturnType<typeof fetchItems>> = [];
  let fetchError: string | null = null;
  try {
    items = await fetchItems();
  } catch (e) {
    fetchError = e instanceof Error ? e.message : "Failed to load items";
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8">
      <DeepLinkButton
        deepLink="erajaya://eraspace/product/apple-iphone-16"
        iosStoreUrl="https://apps.apple.com/id/app/eraspace/id1534301787"
        androidStoreUrl="https://play.google.com/store/apps/details?id=com.eraspace.app&hl=id"
        webFallbackUrl="https://eraspace.com"
      >
        Deeplink PDP iPhone 16
      </DeepLinkButton>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/result?status=success&code=PAYMENT_SUCCESS&ref=demo123"
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Data Completion Result: Success
        </Link>
        <Link
          href="/result?status=cancelled&code=USER_CANCELLED&ref=demo123"
          className="inline-flex items-center justify-center rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
        >
          Data Completion Result: Cancelled
        </Link>
        <Link
          href="/result?status=failed&code=UNKNOWN_ERROR&ref=demo123"
          className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Data Completion Result: Failed
        </Link>
      </div>
      {/* <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Fetched Items:</h1>
        {fetchError ? (
          <p className="text-sm text-red-600 mb-2">{fetchError}</p>
        ) : null}
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="border p-2 rounded">
              {it.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-2xl font-bold">Total Items: {items.length}</div> */}
    </div>
  );
}
