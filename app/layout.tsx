import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almnsa-recruitment.example"),
  title: {
    default: "شركة المنصة | استقدام عمالة منزلية باحترافية",
    template: "%s | شركة المنصة"
  },
  description:
    "شركة المنصة تقدم خدمات الاستقدام ونقل الخدمات والتأجير الشهري باحترافية وموثوقية داخل المملكة العربية السعودية.",
  keywords: ["استقدام", "عمالة منزلية", "نقل خدمات", "مساند", "شركة المنصة"],
  icons: {
    icon: [
      { url: "/logo-almnsa.png", type: "image/png" }
    ],
    shortcut: "/logo-almnsa.png",
    apple: "/logo-almnsa.png"
  },
  openGraph: {
    title: "شركة المنصة للاستقدام",
    description: "تجربة استقدام راقية وواضحة من الاختيار حتى الوصول.",
    locale: "ar_SA",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-979152763" strategy="afterInteractive" />
        <Script id="google-ads-conversion-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-979152763');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
