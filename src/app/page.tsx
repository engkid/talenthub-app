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
    <div className="w-full">
      <div className="relative min-h-dvh w-full md:hidden">
        <Image
          src="/slickwave.png"
          alt="Slickwave"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
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

      <div className="hidden min-h-screen w-full items-center justify-center md:flex">
        <div className="relative flex items-center justify-center">
          <Image
            src="/slickwave.png"
            alt="Slickwave"
            width={480}
            height={240}
            priority
            className="object-contain"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
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
    </div>
  );
}
