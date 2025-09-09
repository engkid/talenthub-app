import DeepLinkButton from "@/components/DeepLinkButton";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <DeepLinkButton
        deepLink="myapp://home"
        iosStoreUrl="https://apps.apple.com/app/id123456789"
        androidStoreUrl="https://play.google.com/store/apps/details?id=com.example.app"
        webFallbackUrl="https://example.com/download"
      >
        Open in App
      </DeepLinkButton>
    </div>
  );
}
