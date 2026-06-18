const WHATSAPP_CONVERSION_SEND_TO = "AW-979152763/jn_ZCNyjmsEcEPve8tID";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: "conversion",
      params: {
        send_to: string;
        event_callback?: () => void;
        event_timeout?: number;
      }
    ) => void;
  }
}

export function openWhatsAppWithConversion(href: string) {
  if (typeof window === "undefined") {
    return;
  }

  let didOpen = false;
  let popup: Window | null = null;

  try {
    popup = window.open("about:blank", "_blank");
    if (popup) {
      popup.opener = null;
    }
  } catch {
    popup = null;
  }

  const openWhatsApp = () => {
    if (didOpen) {
      return;
    }

    didOpen = true;

    if (popup) {
      popup.location.href = href;
      return;
    }

    window.location.href = href;
  };

  if (typeof window.gtag !== "function") {
    openWhatsApp();
    return;
  }

  try {
    window.gtag("event", "conversion", {
      send_to: WHATSAPP_CONVERSION_SEND_TO,
      event_callback: openWhatsApp,
      event_timeout: 1000
    });
    window.setTimeout(openWhatsApp, 1200);
  } catch {
    openWhatsApp();
  }
}

export {};
