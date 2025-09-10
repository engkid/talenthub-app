import DeepLinkButton from "@/components/DeepLinkButton";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <DeepLinkButton
        deepLink="erajaya://eraspace/product/apple-iphone-16"
        iosStoreUrl="https://apps.apple.com/id/app/eraspace/id1534301787"
        androidStoreUrl="https://play.google.com/store/apps/details?id=com.eraspace.app&hl=id"
        webFallbackUrl="https://eraspace.com"
      >
        Open in App
      </DeepLinkButton>
    </div>
  );
}
