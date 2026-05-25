"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { recruitmentSteps } from "@/lib/data";
import { Container, SectionHeading } from "@/components/ui";
import { MotionSection, reveal } from "@/components/Motion";

export default function RecruitmentStepper() {
  const [active, setActive] = useState(0);
  const current = recruitmentSteps[active];

  return (
    <MotionSection {...reveal} className="section-pad bg-gradient-to-b from-ink-900 to-ink-850">
      <Container>
        <SectionHeading
          eyebrow="خطوات الاستقدام"
          title="مسار واضح من التأشيرة حتى الوصول"
          body="اختر أي خطوة لمعرفة ما يحدث فيها وكيف نتابعها معك."
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="grid gap-4">
            {recruitmentSteps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setActive(index)}
                className={`flex items-center gap-5 rounded-[2rem] border p-6 text-right transition ${
                  active === index
                    ? "border-gold-200/70 bg-gold-200 text-ink-950 shadow-gold"
                    : "border-white/10 bg-white/[0.045] text-white hover:border-gold-200/35"
                }`}
              >
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-black ${active === index ? "bg-ink-950 text-gold-100" : "bg-gold-200/12 text-gold-100"}`}>
                  {index + 1}
                </span>
                <span className="arabic-heading text-xl font-black">{step.title}</span>
              </button>
            ))}
          </div>
          <div className="luxury-border flex min-h-[28rem] flex-col justify-between rounded-[2rem] bg-ink-950 p-8 md:p-10">
            <div>
              <CheckCircle2 className="h-14 w-14 text-gold-100" />
              <p className="mt-9 text-base font-black text-gold-100">الخطوة {active + 1}</p>
              <h3 className="arabic-heading mt-5 max-w-xl text-2xl font-black text-white md:text-3xl">{current.title}</h3>
              <p className="mt-8 max-w-2xl text-xl leading-10 text-white/72">{current.body}</p>
            </div>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gold-200 transition-all duration-500"
                style={{ width: `${((active + 1) / recruitmentSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  );
}
