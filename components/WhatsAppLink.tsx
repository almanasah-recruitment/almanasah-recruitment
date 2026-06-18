"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { openWhatsAppWithConversion } from "@/lib/whatsappConversion";

type WhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export default function WhatsAppLink({ href, children, onClick, ...props }: WhatsAppLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    openWhatsAppWithConversion(href);
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
