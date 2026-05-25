"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";

export default function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <button
          key={item.question}
          type="button"
          onClick={() => setActive(active === index ? -1 : index)}
          className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-right transition hover:border-gold-200/35"
        >
          <span className="flex items-center justify-between gap-4">
            <span className="arabic-heading text-xl font-black text-white">{item.question}</span>
            <ChevronDown className={clsx("h-6 w-6 shrink-0 text-gold-100 transition duration-300", active === index && "rotate-180")} />
          </span>
          <span
            className={clsx(
              "grid transition-all duration-300 ease-out",
              active === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <span className="overflow-hidden">
              <span className="mt-5 block whitespace-pre-line text-lg leading-10 text-white/68">{item.answer}</span>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
