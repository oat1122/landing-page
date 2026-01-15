import type {
  Organization,
  WebSite,
  LocalBusiness,
  FAQPage,
  WithContext,
} from "schema-dts";
import { SITE_NAME, SITE_URL } from "./home.metadata";
import { generateFAQSchema } from "@/config/content/faq.data";

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "บริษัท ธน พลัส 153 จำกัด",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+66-62-497-7952",
    contactType: "customer service",
    availableLanguage: ["Thai"],
  },
  sameAs: [],
};

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง รับผลิตเสื้อตามออเดอร์",
};

export const localBusinessSchema: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "บริษัท ธน พลัส 153 จำกัด",
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+66-62-497-7952",
  email: "monaliza11867@gmail.com",
  description:
    "โรงงานผลิตเสื้อคุณภาพ รับผลิตเสื้อยืด เสื้อโปโล ยูนิฟอร์ม ราคาโรงงาน ส่งตรงจากโรงงาน",
  address: {
    "@type": "PostalAddress",
    streetAddress: "503 ถ. สุโขทัย",
    addressLocality: "แขวงสวนจิตรลดา เขตดุสิต",
    addressRegion: "กรุงเทพมหานคร",
    postalCode: "10300",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.7743516,
    longitude: 100.5095978,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
};

// FAQ Schema - ใช้ข้อมูลจาก faq.data.ts (Single Source of Truth)
export const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: generateFAQSchema(),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JsonLd({ data }: { data: WithContext<any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
