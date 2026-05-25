import type { Metadata } from "next";
import RequestPage from "@/components/RequestPage";

export const metadata: Metadata = {
  title: "طلب نقل خدمات",
  description: "نموذج طلب نقل خدمات لدى شركة المنصة مع إرسال مباشر عبر واتساب."
};

export default function TransferRequestPage() {
  return <RequestPage type="transfer" />;
}
