"use client";

import React from "react";

type DeepLinkButtonProps = {
  deepLink: string;
  iosStoreUrl?: string;
  androidStoreUrl?: string;
  webFallbackUrl?: string;
  fallbackUrl?: string; // generic fallback if platform-specific not provided
  timeoutMs?: number; // time to wait before redirecting to store
  className?: string;
  children?: React.ReactNode; // button label/content
  onClick?: () => void; // optional additional click handler
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
};

/**
 * A button that attempts to open a mobile deep link and falls back to
 * the appropriate app store or web URL if the app isn’t installed.
 *
 * Usage example:
 * <DeepLinkButton
 *   deepLink="myapp://home"
 *   iosStoreUrl="https://apps.apple.com/app/id123456789"
 *   androidStoreUrl="https://play.google.com/store/apps/details?id=com.example.app"
 *   webFallbackUrl="https://example.com/download"
 * >
 *   Open in App
 * </DeepLinkButton>
 */
export default function DeepLinkButton({
  deepLink,
  iosStoreUrl,
  androidStoreUrl,
  webFallbackUrl,
  fallbackUrl,
  timeoutMs = 1600,
  className,
  children,
  onClick,
  disabled,
  title,
  ariaLabel,
}: DeepLinkButtonProps) {
  const handleClick = React.useCallback(() => {
    if (disabled) return;
    onClick?.();

    // Guard for non-browser environments, though this is a client component.
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const ua = navigator.userAgent || navigator.vendor || "";
    const isAndroid = /android/i.test(ua);
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const chosenFallback = (() => {
      if (isIOS) return iosStoreUrl || fallbackUrl || webFallbackUrl || undefined;
      if (isAndroid) return androidStoreUrl || fallbackUrl || webFallbackUrl || undefined;
      return webFallbackUrl || fallbackUrl || iosStoreUrl || androidStoreUrl || undefined;
    })();

    let didHide = false;
    let fallbackTimer: number | undefined;

    const clearAll = () => {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };

    const onVisibilityChange = () => {
      // If the page becomes hidden shortly after trying the deep link,
      // assume the OS switched to the app — cancel fallback.
      if (document.hidden) {
        didHide = true;
        clearAll();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    // Set a timer to redirect to fallback if app didn't open.
    if (chosenFallback) {
      fallbackTimer = window.setTimeout(() => {
        if (!didHide) {
          try {
            window.location.href = chosenFallback;
          } catch {
            // Swallow errors from blocked navigations
          }
        }
        clearAll();
      }, Math.max(300, timeoutMs));
    }

    // Attempt to open the deep link. Using location.href ensures it runs inside a user gesture.
    try {
      window.location.href = deepLink;
    } catch {
      // Some browsers might block; let fallback handle it
    }

    // Safety: remove listeners after a bit regardless.
    window.setTimeout(clearAll, Math.max(2000, timeoutMs + 500));
  }, [androidStoreUrl, ariaLabel, deepLink, disabled, fallbackUrl, iosStoreUrl, onClick, timeoutMs, webFallbackUrl]);

  return (
    <button
      type="button"
      title={title}
      aria-label={ariaLabel}
      onClick={handleClick}
      disabled={disabled}
      className={
        className ??
        "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      }
    >
      {children ?? "Open in App"}
    </button>
  );
}

