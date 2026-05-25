import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import PageShell from "@/components/PageShell";
import { policyDocuments } from "@/lib/data";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "عن الاستقدام",
  description: "سياسات وقوانين الاستقدام داخل المملكة ووثائق إرشادية من شركة المنصة."
};

export default function RecruitmentInfoPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-ink-950 pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/92 via-black/78 to-black/58" />
        </div>
        <Container className="relative flex min-h-[28rem] items-center py-20">
          <div className="max-w-3xl">
            <span className="mb-6 inline-flex rounded-full border border-gold-300/25 bg-gold-300/10 px-5 py-2.5 text-base font-bold text-gold-100">
              عن الاستقدام
            </span>
            <h1 className="arabic-heading max-w-5xl text-3xl font-black text-white md:text-4xl lg:text-5xl">
              سياسات وقوانين الاستقدام داخل المملكة
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-10 text-white/72">
              نضع بين يديك ملفات إرشادية تساعدك على فهم الحقوق والواجبات وشروط الاستقدام قبل بدء الطلب.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-pad surface-light">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
            {policyDocuments.map((document) => (
              <a
                key={document.title}
                href={document.href}
                target="_blank"
                rel="noreferrer"
                className="group luxury-border rounded-[2rem] bg-white/[0.62] p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold-200/18 text-gold-600 transition group-hover:bg-gold-200 group-hover:text-ink-950">
                  <FileText className="h-8 w-8" />
                </div>
                <h2 className="arabic-heading mt-8 min-h-20 text-xl font-black text-white md:text-2xl">{document.title}</h2>
                <span className="mt-7 inline-flex items-center gap-2 text-base font-black text-gold-100">
                  فتح ملف PDF
                  <Download className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
