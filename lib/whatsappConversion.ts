const WHATSAPP_TRACKING_TIMEOUT_MS = 2000;

export type WhatsAppTrackingContext = {
  ctaLocation:
    | "header"
    | "mobile_menu"
    | "hero"
    | "floating"
    | "country_card"
    | "support"
    | "contact_cta"
    | "contact_page"
    | "request_form";
  serviceType: "recruitment" | "transfer" | "rental" | "support" | "general";
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function openWhatsAppWithTracking(href: string, context: WhatsAppTrackingContext) {
  if (typeof window === "undefined") {
    return;
  }

  let didOpen = false;
  let popup: Window | null = null;
  let fallbackTimer: number | undefined;

  try {
    popup = window.open("about:blank", "_blank");
  } catch {
    popup = null;
  }

  if (popup) {
    try {
      popup.opener = null;
    } catch {
      // Keep the reserved window even if the browser disallows changing opener.
    }
  }

  const openWhatsAppOnce = () => {
    if (didOpen) {
      return;
    }

    didOpen = true;

    if (fallbackTimer !== undefined) {
      window.clearTimeout(fallbackTimer);
    }

    if (popup && !popup.closed) {
      try {
        popup.location.href = href;
        return;
      } catch {
        try {
          popup.close();
        } catch {
          // Navigation in the current window remains the fallback.
        }
      }
    }

    window.location.href = href;
  };

  // Set this before push: GTM may call eventCallback synchronously.
  fallbackTimer = window.setTimeout(openWhatsAppOnce, WHATSAPP_TRACKING_TIMEOUT_MS);

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_click",
      tracking_schema: "whatsapp_v2",
      cta_location: context.ctaLocation,
      service_type: context.serviceType,
      page_path: window.location.pathname,
      eventCallback: openWhatsAppOnce,
      eventTimeout: WHATSAPP_TRACKING_TIMEOUT_MS
    });
  } catch {
    openWhatsAppOnce();
  }
}
