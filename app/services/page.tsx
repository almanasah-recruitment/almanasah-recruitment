import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import { ContactCTA, ServicesGrid, StepsTimeline } from "@/components/Sections";

export const metadata: Metadata = {
  title: "خدماتنا",
  description: "خدمات شركة المنصة للاستقدام ونقل الخدمات والتأجير الشهري واختيار السير الذاتية."
};

export default function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="خدماتنا"
        title="خدمات استقدام مرتبة حول احتياجك"
        body="اختر الخدمة المناسبة، واترك لفريق المنصة ترتيب المتطلبات، الترشيحات، والمتابعة حتى اكتمال الطلب."
      />
      <ServicesGrid compact />
      <StepsTimeline />
      <ContactCTA />
    </PageShell>
  );
}
