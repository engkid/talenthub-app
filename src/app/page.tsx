import DeepLinkButton from "@/components/DeepLinkButton";
import { fetchItems } from "@/lib/api";

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function Home() {
  const items = await fetchItems();
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8">
      <DeepLinkButton
        deepLink="erajaya://eraspace/product/apple-iphone-16"
        iosStoreUrl="https://apps.apple.com/id/app/eraspace/id1534301787"
        androidStoreUrl="https://play.google.com/store/apps/details?id=com.eraspace.app&hl=id"
        webFallbackUrl="https://eraspace.com"
      >
        Open in App
      </DeepLinkButton>
      <div className="text-center">
        <h1 className="text-xl font-bold mb-4">Fetched Items:</h1>
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="border p-2 rounded">
              {it.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
