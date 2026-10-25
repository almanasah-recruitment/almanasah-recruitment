const COUNTRIES_APPLY_TIMEOUT_MS = 2000;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function reserveWhatsAppWindow(href: string) {
  let didOpen = false;
  let popup: Window | null = null;

  try {
    popup = window.open("about:blank", "_blank");
  } catch {
    popup = null;
  }

  if (popup) {
    try {
      popup.opener = null;
    } catch {
      // Preserve the reserved window if the browser disallows changing opener.
    }
  }

  return () => {
    if (didOpen) return;
    didOpen = true;

    if (popup && !popup.closed) {
      try {
        popup.location.href = href;
        return;
      } catch {
        try {
          popup.close();
        } catch {
          // Fall back to the current window if the reserved window is unavailable.
        }
      }
    }

    window.location.href = href;
  };
}

export function openWhatsApp(href: string) {
  if (typeof window === "undefined") return;
  reserveWhatsAppWindow(href)();
}

export function openCountriesApplyWhatsApp(href: string) {
  if (typeof window === "undefined") return;

  // The dedicated CTA must never become a conversion on another route.
  if (window.location.pathname !== "/countries") {
    openWhatsApp(href);
    return;
  }

  const navigateOnce = reserveWhatsAppWindow(href);
  let fallbackTimer: number | undefined;
  const openWhatsAppOnce = () => {
    if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
    navigateOnce();
  };

  // GTM can invoke its callback synchronously; register the fallback first.
  fallbackTimer = window.setTimeout(openWhatsAppOnce, COUNTRIES_APPLY_TIMEOUT_MS);

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "countries_apply_click",
      page_path: "/countries",
      eventCallback: openWhatsAppOnce,
      eventTimeout: COUNTRIES_APPLY_TIMEOUT_MS
    });
  } catch {
    openWhatsAppOnce();
  }
}
