"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { contact, heroSlides, serviceRequests, stats } from "@/lib/data";
import { Container } from "@/components/ui";
import { MotionDiv } from "@/components/Motion";

const ctas = [
  serviceRequests[0],
  serviceRequests[1],
  { label: "طلب التأجير", href: serviceRequests[2].href },
  { label: "واتساب", href: `https://wa.me/${contact.whatsapp}`, whatsapp: true }
];

export default function Hero() {
  const slide = heroSlides[0];

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-ink-950 pt-28">
      <div className="absolute inset-0">
        <img src={slide.image} alt="" className="h-full w-full object-cover brightness-[0.95] saturate-[1.05]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-ink-950/78 via-ink-900/46 to-ink-800/18" />
      <div className="absolute inset-0 noise opacity-18" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />

      <Container className="relative flex min-h-[calc(100vh-5rem)] items-center py-8">
        <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_0.55fr] lg:items-center">
          <MotionDiv
            key={slide.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass hero-panel luxury-border max-w-4xl rounded-[2rem] p-6 md:p-9"
          >
            <span className="inline-flex rounded-full border border-gold-200/25 bg-gold-200/10 px-4 py-2 text-sm font-black text-gold-100">
              {slide.eyebrow}
            </span>
            <h1 className="arabic-heading mt-6 max-w-3xl text-3xl font-black text-white md:text-4xl lg:text-5xl">
              {slide.title}
            </h1>
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ctas.map((cta, index) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={
                    index === 0
                      ? "inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gold-200 px-5 text-base font-black text-ink-950 shadow-gold transition hover:-translate-y-0.5 hover:bg-white"
                      : "inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/18 bg-ink-950/62 px-5 text-base font-black text-white transition hover:-translate-y-0.5 hover:border-gold-200/55 hover:text-gold-100"
                  }
                >
                  {"whatsapp" in cta ? <MessageCircle className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                  {cta.label}
                </Link>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-base leading-10 text-white/82 md:text-lg">{slide.body}</p>
          </MotionDiv>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/18 bg-ink-950/64 p-6 backdrop-blur-xl">
                <p className="text-3xl font-black text-gold-100">{stat.value}</p>
                <p className="mt-2 text-base font-bold text-white/72">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
