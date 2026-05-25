"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { contact, requestPageContent } from "@/lib/data";

type RequestType = keyof typeof requestPageContent;
type Field = {
  name: string;
  label: string;
  type: "text" | "select";
  options?: string[];
};

const fieldSets: Record<RequestType, Field[]> = {
  recruitment: [
    { name: "nationality", label: "الجنسية", type: "select", options: ["كينيا", "أوغندا", "الفلبين", "إثيوبيا", "بنغلاديش"] },
    { name: "religion", label: "ديانة العاملة", type: "select", options: ["مسلمة", "غير مسلمة", "لا يهم"] },
    { name: "age", label: "العمر", type: "select", options: ["21 - 30", "31 - 40", "41 - 50"] },
    { name: "experience", label: "الخبرة", type: "select", options: ["خبرة داخل المملكة", "خبرة خارج المملكة", "بدون خبرة"] },
    { name: "name", label: "الاسم", type: "text" },
    { name: "phone", label: "رقم الجوال", type: "text" }
  ],
  transfer: [
    { name: "workerType", label: "نوع العمالة", type: "select", options: ["عاملة منزلية", "سائق خاص", "عامل منزلي"] },
    { name: "nationality", label: "الجنسية", type: "select", options: ["كينيا", "أوغندا", "الفلبين", "إثيوبيا", "بنغلاديش", "أخرى"] },
    { name: "currentCity", label: "مدينة التواجد", type: "text" },
    { name: "name", label: "الاسم", type: "text" },
    { name: "phone", label: "رقم الجوال", type: "text" }
  ],
  rental: [
    { name: "serviceType", label: "نوع التأجير", type: "select", options: ["يومي", "شهري", "ثلاثة أشهر", "ستة أشهر"] },
    { name: "workerType", label: "نوع العمالة", type: "select", options: ["عاملة منزلية", "سائق خاص", "عامل منزلي"] },
    { name: "city", label: "المدينة", type: "text" },
    { name: "name", label: "الاسم", type: "text" },
    { name: "phone", label: "رقم الجوال", type: "text" }
  ]
};

const stepLabels = ["اختيار الخدمة", "بيانات التواصل", "مراجعة الطلب"];

export default function RequestForm({ type }: { type: RequestType }) {
  const content = requestPageContent[type];
  const Icon = content.icon;
  const fields = fieldSets[type];
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});

  const visibleFields = useMemo(() => {
    if (step === 0) return fields.filter((field) => !["name", "phone"].includes(field.name));
    if (step === 1) return fields.filter((field) => ["name", "phone"].includes(field.name));
    return [];
  }, [fields, step]);

  function updateValue(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function buildMessage() {
    const lines: string[] = [content.messageTitle];
    fields.forEach((field) => {
      lines.push(`${field.label}: ${values[field.name] || ""}`);
    });
    return lines.join("\n");
  }

  function submitToWhatsApp() {
    const message = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${contact.whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="luxury-border rounded-[2rem] bg-white/[0.045] p-7 md:p-10">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold-200 text-ink-950">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <p className="text-base font-black text-gold-100">{content.eyebrow}</p>
          <h2 className="arabic-heading text-2xl font-black text-white">{content.title}</h2>
        </div>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-3">
        {stepLabels.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-2xl px-5 py-4 text-base font-black transition ${
              step === index ? "bg-gold-200 text-ink-950" : "bg-ink-950/64 text-white/66 hover:text-gold-100"
            }`}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>

      {step < 2 ? (
        <div className="mt-9 grid gap-6 md:grid-cols-2">
          {visibleFields.map((field) => (
            <label key={field.name} className="grid gap-2">
              <span className="text-base font-bold text-white/72">{field.label}</span>
              {field.type === "select" ? (
                <select
                  value={values[field.name] || ""}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  className="min-h-14 rounded-2xl border border-white/10 bg-ink-950/70 px-5 text-white outline-none transition focus:border-gold-200/60"
                >
                  <option value="">اختر {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={values[field.name] || ""}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  className="min-h-14 rounded-2xl border border-white/10 bg-ink-950/70 px-5 text-white outline-none transition focus:border-gold-200/60"
                  placeholder={`اكتب ${field.label}`}
                />
              )}
            </label>
          ))}
        </div>
      ) : (
        <div className="mt-9 rounded-3xl border border-white/10 bg-ink-950/64 p-6">
          <h3 className="arabic-heading text-2xl font-black text-white">مراجعة رسالة واتساب</h3>
          <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-black/35 p-5 text-right font-arabic text-lg leading-9 text-white/72">
            {buildMessage()}
          </pre>
        </div>
      )}

      <div className="mt-9 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/12 px-7 text-base font-black text-white transition hover:border-gold-200/50 hover:text-gold-100 disabled:opacity-35"
          disabled={step === 0}
        >
          <ArrowRight className="h-4 w-4" />
          السابق
        </button>
        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(2, current + 1))}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold-200 px-7 text-base font-black text-ink-950 transition hover:bg-white"
          >
            التالي
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submitToWhatsApp}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold-200 px-7 text-base font-black text-ink-950 transition hover:bg-white"
          >
            <MessageCircle className="h-5 w-5" />
            إرسال عبر واتساب
          </button>
        )}
      </div>
    </div>
  );
}
