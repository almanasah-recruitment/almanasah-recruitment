import { MessageCircle } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";
import { contact } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      href={`https://wa.me/${contact.whatsapp}`}
      className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_18px_50px_rgba(7,17,38,0.24)] ring-4 ring-white/80 transition hover:-translate-y-1"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-7 w-7" />
    </WhatsAppLink>
  );
}
