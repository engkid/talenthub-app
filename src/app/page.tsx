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
    <div className="flex min-h-dvh w-full items-center justify-center md:min-h-screen">
      <div className="relative w-full min-h-dvh overflow-hidden md:min-h-[80vh] md:max-w-5xl md:rounded-2xl md:shadow-xl">
        <Image
          src="/slickwave.png"
          alt="Slickwave"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover md:object-contain"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <DeepLinkButton
            deepLink="https://discord.gg/p4XHPKuqXd"
            iosStoreUrl="https://discord.gg/p4XHPKuqXd"
            androidStoreUrl="https://discord.gg/p4XHPKuqXd"
            webFallbackUrl="https://discord.gg/p4XHPKuqXd"
          >
            JOIN SLICKWAVE!
          </DeepLinkButton>
          <p
            className="text-xs font-medium tracking-wide"
            style={{ color: "#18302A" }}
          >
            (via Discord)
          </p>
        </div>
      </div>
    </div>
  );
}
