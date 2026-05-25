import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import { ContactCTA, CountriesSection } from "@/components/Sections";

export const metadata: Metadata = {
  title: "دول الاستقدام",
  description: "دول الاستقدام المتاحة لدى شركة المنصة: كينيا، أوغندا، الفلبين، إثيوبيا، بنغلاديش."
};

export default function CountriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="دول الاستقدام"
        title="دول متعددة وخيارات مرشحة بعناية"
        body="نعمل على توفير السير المناسبة من الدول المتاحة مع توضيح المدد والمتطلبات حسب توفر الطلبات."
      />
      <CountriesSection compact />
      <ContactCTA />
    </PageShell>
  );
}
