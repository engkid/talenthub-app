This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deep Link Button Component

A reusable button that opens a mobile deep link with safe fallbacks.

Usage:

```tsx
// src/app/page.tsx
import DeepLinkButton from "@/components/DeepLinkButton";

export default function Page() {
  return (
    <main className="p-6">
      <DeepLinkButton
        deepLink="myapp://home"
        iosStoreUrl="https://apps.apple.com/app/id123456789"
        androidStoreUrl="https://play.google.com/store/apps/details?id=com.example.app"
        webFallbackUrl="https://example.com/download"
      >
        Open in App
      </DeepLinkButton>
    </main>
  );
}
```

Props:

- `deepLink`: the custom URL scheme to open (required)
- `iosStoreUrl`: App Store URL fallback (iOS)
- `androidStoreUrl`: Play Store URL fallback (Android)
- `webFallbackUrl`: web landing/download page
- `fallbackUrl`: generic fallback if platform-specific is not provided
- `timeoutMs`: delay before fallback redirect (default 1600ms)
- `className`: optional styling override
