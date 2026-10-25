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
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({tracking_schema: 'whatsapp_v2'});
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NSR8FVTJ');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NSR8FVTJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
