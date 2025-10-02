"use client";

import DeepLinkButton from "@/components/DeepLinkButton";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex min-h-dvh w-full items-center justify-center md:min-h-screen">
      <div className="hero-container relative overflow-hidden md:rounded-2xl md:shadow-xl">
        <Image
          src="/slickwave.png"
          alt="Slickwave"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 640px"
          className={`object-cover md:object-contain transition-opacity duration-75 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setImageLoaded(true)}
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
