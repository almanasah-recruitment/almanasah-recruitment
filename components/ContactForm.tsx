"use client";

import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <form className="luxury-border rounded-[2rem] bg-white/[0.045] p-6 md:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-base font-bold text-white/72">الاسم</span>
          <input className="min-h-14 rounded-2xl border border-white/10 bg-ink-950/70 px-5 text-white outline-none transition focus:border-gold-200/60" placeholder="اكتب الاسم" />
        </label>
        <label className="grid gap-2">
          <span className="text-base font-bold text-white/72">رقم الهاتف</span>
          <input className="min-h-14 rounded-2xl border border-white/10 bg-ink-950/70 px-5 text-white outline-none transition focus:border-gold-200/60" placeholder="05xxxxxxxx" />
        </label>
        <label className="grid gap-2">
          <span className="text-base font-bold text-white/72">الموضوع</span>
          <select className="min-h-14 rounded-2xl border border-white/10 bg-ink-950/70 px-5 text-white outline-none transition focus:border-gold-200/60">
            <option>استفسار</option>
            <option>شكوى</option>
            <option>اقتراح</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-base font-bold text-white/72">الرسالة</span>
          <textarea className="min-h-40 rounded-2xl border border-white/10 bg-ink-950/70 px-5 py-4 text-white outline-none transition focus:border-gold-200/60" placeholder="اكتب رسالتك هنا" />
        </label>
        <button type="button" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gold-200 px-7 text-base font-black text-ink-950 transition hover:bg-white">
          <Send className="h-5 w-5" />
          إرسال الطلب
        </button>
      </div>
    </form>
  );
}
