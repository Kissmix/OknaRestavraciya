import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CONTACTS, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/contacts";
import { LeadModalProvider } from "@/components/lead-modal";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingContacts } from "@/components/floating-contacts";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Реставрация и утепление окон в квартирах, домах и зданиях | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Реставрация, ремонт, покраска и утепление деревянных и пластиковых окон в квартирах, домах и зданиях. В 3–4 раза выгоднее замены, без пыли и грязи. Цены от 7 499 ₽, выезд на замер бесплатно.",
  keywords: [
    "реставрация деревянных окон",
    "ремонт окон",
    "покраска деревянных окон",
    "утепление окон",
    "утепление пластиковых окон",
    "реставрация балконного блока",
    "регулировка окон",
    "окна в квартире",
    "окна в частном доме",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE_NAME,
    title: `Реставрация и утепление окон | ${SITE_NAME}`,
    description:
      "Вернём тепло, тишину и красивый вид вашим окнам. В 3–4 раза выгоднее замены. Работаем без пыли и грязи.",
    images: [{ url: "/images/hero.jpg", width: 1600, height: 900 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c2703e",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE_NAME,
  description: `${SITE_TAGLINE} в квартирах, домах и зданиях. Реставрация, ремонт и покраска деревянных окон, утепление деревянных и пластиковых окон.`,
  url: SITE_URL,
  telephone: "+7 933 170-82-07",
  email: CONTACTS.email,
  priceRange: "от 7 499 ₽",
  openingHours: "Mo-Su 08:00-21:00",
  sameAs: [CONTACTS.max, CONTACTS.whatsapp, CONTACTS.telegram],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <LeadModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContacts />
        </LeadModalProvider>
      </body>
    </html>
  );
}
