"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { contact, requestPageContent } from "@/lib/data";
import { openWhatsAppWithConversion } from "@/lib/whatsappConversion";

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
    { name: "workerType", label: "المهنة", type: "select", options: ["عاملة منزلية", "سائق خاص", "عامل منزلي"] },
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

export default function RequestForm({ type }: { type: RequestType }) {
  const content = requestPageContent[type];
  const Icon = content.icon;
  const fields = fieldSets[type];
  const [values, setValues] = useState<Record<string, string>>({});

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
    openWhatsAppWithConversion(`https://wa.me/${contact.whatsapp}?text=${message}`);
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

      <div className="mt-9 grid gap-6 md:grid-cols-2">
        {fields.map((field) => (
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

      <div className="mt-9 flex justify-end">
        <button
          type="button"
          onClick={submitToWhatsApp}
          className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gold-200 px-7 text-base font-black text-ink-950 transition hover:bg-white md:w-auto"
        >
          <MessageCircle className="h-5 w-5" />
          إرسال عبر واتساب
        </button>
      </div>
    </div>
  );
}
