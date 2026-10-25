"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { openWhatsAppWithTracking, type WhatsAppTrackingContext } from "@/lib/whatsappConversion";

type WhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & WhatsAppTrackingContext & {
  href: string;
  children: ReactNode;
};

export default function WhatsAppLink({ href, children, onClick, ctaLocation, serviceType, ...props }: WhatsAppLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    openWhatsAppWithTracking(href, { ctaLocation, serviceType });
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
