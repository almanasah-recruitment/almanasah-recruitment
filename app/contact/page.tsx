import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { ContactBlock } from "@/components/Sections";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع شركة المنصة لطلب الاستقدام أو نقل الخدمات أو التأجير الشهري."
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactBlock />
    </PageShell>
  );
}
