import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import { ContactCTA, FAQSection } from "@/components/Sections";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات عن أهم أسئلة الاستقدام ونقل الخدمات لدى شركة المنصة."
};

export default function FAQPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الأسئلة الشائعة"
        title="كل ما تحتاج معرفته قبل بدء الطلب"
        body="إجابات مختصرة تساعدك على فهم المدد، المتابعة، الخدمات، وخطوات التواصل."
      />
      <FAQSection compact />
      <ContactCTA />
    </PageShell>
  );
}
