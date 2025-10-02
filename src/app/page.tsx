import DeepLinkButton from "@/components/DeepLinkButton";
import { fetchItems } from "@/lib/api";
import Image from "next/image";

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
      <Image src="/slickwave.png" alt="Next.js Logo" width={240} height={120} priority />
      <DeepLinkButton
        deepLink="https://discord.gg/p4XHPKuqXd"
        iosStoreUrl="https://discord.gg/p4XHPKuqXd"
        androidStoreUrl="https://discord.gg/p4XHPKuqXd"
        webFallbackUrl="https://discord.gg/p4XHPKuqXd"
      >
        Join langsung disini!
      </DeepLinkButton>
    </div>
  );
}
