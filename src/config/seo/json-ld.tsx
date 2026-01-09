import type {
  Organization,
  WebSite,
  LocalBusiness,
  FAQPage,
  WithContext,
} from "schema-dts";
import { SITE_NAME, SITE_URL } from "./home.metadata";

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

export const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "สั่งเสื้อขั้นต่ำกี่ตัว?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "โรงงานของเรารับผลิตเสื้อขั้นต่ำเริ่มต้นเพียง 30 ตัวต่อแบบเท่านั้น เหมาะสำหรับทั้งธุรกิจ SME, ทีมงานขนาดเล็ก ไปจนถึงองค์กรใหญ่ที่ต้องการสั่งผลิตจำนวนมาก (Mass Production) ในราคาโรงงาน",
      },
    },
    {
      "@type": "Question",
      name: "ผลิตเสื้อใช้เวลากี่วัน?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ระยะเวลาการผลิตปกติอยู่ที่ 14-21 วัน หลังจากสรุปแบบและยืนยันมัดจำ หากต้องการงานด่วนพิเศษ (Rush Order) สามารถแจ้งฝ่ายขายเพื่อตรวจสอบคิวการผลิตและเร่งดำเนินการให้ได้",
      },
    },
    {
      "@type": "Question",
      name: "มีบริการออกแบบไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "มีบริการออกแบบฟรี! เมื่อสั่งผลิตเสื้อกับเรา เรามีทีมกราฟิกมืออาชีพช่วยวางแบบ จัดวางโลโก้ และปรับแก้จนกว่าคุณจะพอใจ",
      },
    },
    {
      "@type": "Question",
      name: "รับประกันคุณภาพไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "เรารับประกันคุณภาพสินค้า 100% มีขั้นตอน QC ตรวจสอบเสื้อทุกตัวก่อนจัดส่ง หากพบสินค้ามีตำหนิจากการผลิต เรายินดีผลิตใหม่ให้ฟรี",
      },
    },
    {
      "@type": "Question",
      name: "จัดส่งทั่วประเทศไหม?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "เรามีบริการจัดส่งฟรีทั่วประเทศ (ตามเงื่อนไขยอดสั่งซื้อ) ผ่านขนส่งเอกชนมาตรฐาน ไม่ว่าคุณจะอยู่จังหวัดไหน",
      },
    },
  ],
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
