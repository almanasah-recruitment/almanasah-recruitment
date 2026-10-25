"use client";

import type { ComponentProps } from "react";
import WhatsAppLink from "@/components/WhatsAppLink";
import { openCountriesApplyWhatsApp } from "@/lib/whatsapp";

type CountryApplyLinkProps = Omit<ComponentProps<typeof WhatsAppLink>, "onClick">;

export default function CountryApplyLink({ href, children, ...props }: CountryApplyLinkProps) {
  return (
    <WhatsAppLink
      {...props}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        openCountriesApplyWhatsApp(href);
      }}
    >
      {children}
    </WhatsAppLink>
  );
}
