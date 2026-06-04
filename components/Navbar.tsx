"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import { contact, navLinks } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl transition duration-300 ${scrolled || open ? "nav-solid" : "nav-dark"}`}>
      <nav className="mx-auto flex h-28 max-w-[98rem] items-center justify-between gap-3 px-5 sm:px-7 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2 md:gap-3" aria-label="شركة المنصة الذهبية للاستقدام">
          <div className="flex h-20 w-40 shrink-0 items-center justify-center md:w-44">
            <img src="/logo-almnsa.png" alt="شركة المنصة الذهبية للاستقدام" className="max-h-16 w-auto object-contain md:max-h-[4.5rem]" />
          </div>
          <div className="hidden min-w-0 xl:block">
            <p className="arabic-heading text-lg font-black leading-[1.35] text-white nav-link md:text-xl">
              شركة المنصة الذهبية للاستقدام
            </p>
          </div>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className="nav-link inline-flex whitespace-nowrap items-center gap-1 rounded-full px-2.5 py-2.5 text-[0.82rem] font-extrabold text-white/82 transition hover:bg-white/10 hover:text-gold-100 xl:px-3 xl:text-sm"
              >
                {link.label}
                {"dropdown" in link ? <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" /> : null}
              </Link>
              {"dropdown" in link ? (
                <div className="invisible absolute right-0 top-11 w-56 translate-y-2 rounded-3xl border border-white/20 bg-white/95 p-2 opacity-0 shadow-soft backdrop-blur-xl transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {link.dropdown?.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 text-sm font-black text-ink-950 transition hover:bg-gold-200 hover:text-ink-950"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href={`https://wa.me/${contact.whatsapp}`}
            className="whatsapp-main inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-black text-ink-950 transition hover:bg-gold-100"
          >
            <MessageCircle className="h-4 w-4" />
            واتساب
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="nav-icon grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white lg:hidden"
          aria-label="فتح القائمة"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-ink-950/10 bg-white/96 px-5 py-5 shadow-soft lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-extrabold text-ink-950 hover:bg-sand-100"
                >
                  {link.label}
                </Link>
                {"dropdown" in link ? (
                  <div className="mr-4 grid gap-1 border-r border-gold-200/24 pr-3">
                    {link.dropdown?.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="rounded-2xl px-4 py-2 text-sm font-bold text-gold-600 hover:bg-sand-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="mt-3 grid gap-3">
              <Link
                href={`https://wa.me/${contact.whatsapp}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-950 text-sm font-black text-white"
              >
                <MessageCircle className="h-4 w-4" />
                واتساب
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
