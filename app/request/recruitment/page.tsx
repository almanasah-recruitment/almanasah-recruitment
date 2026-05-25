import type { Metadata } from "next";
import RequestPage from "@/components/RequestPage";

export const metadata: Metadata = {
  title: "طلب استقدام",
  description: "نموذج طلب استقدام لدى شركة المنصة مع إرسال مباشر عبر واتساب."
};

export default function RecruitmentRequestPage() {
  return <RequestPage type="recruitment" />;
}
