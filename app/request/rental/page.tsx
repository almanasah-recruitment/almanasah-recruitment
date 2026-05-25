import type { Metadata } from "next";
import RequestPage from "@/components/RequestPage";

export const metadata: Metadata = {
  title: "طلب تأجير",
  description: "نموذج طلب تأجير شهري لدى شركة المنصة مع إرسال مباشر عبر واتساب."
};

export default function RentalRequestPage() {
  return <RequestPage type="rental" />;
}
