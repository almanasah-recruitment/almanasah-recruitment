import Link from "next/link";
import { Facebook, Instagram, Linkedin, MessageCircle, Twitter } from "lucide-react";
import { contact, navLinks } from "@/lib/data";
import { Container } from "@/components/ui";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-ink-900 to-ink-950 py-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-28 w-64 items-center justify-center rounded-3xl bg-white/95 px-5 shadow-gold ring-1 ring-gold-200/35">
                <img src="/logo-almnsa.png" alt="شركة المنصة الذهبية للاستقدام" className="max-h-24 w-auto object-contain" />
              </div>
            </div>
            <p className="mt-5 max-w-sm leading-8 text-white/58">
              نقدم خدمات استقدام العمالة المنزلية ونقل الخدمات والتأجير الشهري بتجربة رقمية راقية ومتابعة موثوقة.
            </p>
          </div>
          <div>
            <h3 className="arabic-heading font-black text-white">روابط سريعة</h3>
            <div className="mt-5 grid gap-3">
              {navLinks.slice(0, 5).map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-bold text-white/58 transition hover:text-gold-100">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="arabic-heading font-black text-white">معلومات التواصل</h3>
            <div className="mt-5 grid gap-3 text-sm font-bold text-white/58">
              <span>{contact.phone}</span>
              <span>{contact.mobileDisplay}</span>
              <span>{contact.email}</span>
              <span>{contact.address}</span>
            </div>
          </div>
          <div>
            <h3 className="arabic-heading font-black text-white">تابعنا</h3>
            <div className="mt-5 flex gap-3">
              {[Twitter, Instagram, Linkedin, Facebook, MessageCircle].map((Icon, index) => (
                <Link key={index} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/66 transition hover:border-gold-200/50 hover:text-gold-100">
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm font-bold text-white/46">
          جميع الحقوق محفوظة شركة المنصة © 2026
        </div>
      </Container>
    </footer>
  );
}
