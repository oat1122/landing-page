import type { Metadata } from "next";

const SITE_URL = "https://xn--o3c1bj3b4bj8cd.com";
const SITE_NAME = "โรงงานผลิตเสื้อ | เสื้อยืด เสื้อโปโล ราคาโรงงาน";

// ===== ข้อมูลติดต่อ =====
// ทีม SEO แก้ไขข้อมูลติดต่อได้ที่นี่
export const CONTACT_INFO = {
  company: {
    name: "บริษัท ธน พลัส 153 จำกัด",
  },
  address: {
    full: "503 ถ. สุโขทัย แขวงสวนจิตรลดา เขตดุสิต กรุงเทพมหานคร 10300",
    multiline: "503 ถ. สุโขทัย แขวงสวนจิตรลดา\nเขตดุสิต กรุงเทพมหานคร 10300",
  },
  phone: {
    display: "062-497-7952",
    href: "tel:+66624977952",
  },
  email: {
    display: "monaliza11867@gmail.com",
    href: "mailto:monaliza11867@gmail.com",
  },
  businessHours: {
    days: "จันทร์ - ศุกร์",
    hours: "09:00 - 18:00 น.",
  },
  googleMaps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.0808607817453!2d100.5242382751636!3d13.773997096779127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299e9b34e3e21%3A0xff3e2eda5f3165fc!2sThanaplus!5e0!3m2!1sth!2sth!4v1768820879116!5m2!1sth!2sth",
    directionsUrl:
      "https://maps.google.com/?q=503+สุโขทัย+สวนจิตรลดา+ดุสิต+กรุงเทพ+10300",
  },
} as const;

// ===== Keywords จัดหมวดหมู่สำหรับหน้า Contact =====
export const CONTACT_KEYWORDS = {
  // การติดต่อ
  contact: [
    "ติดต่อโรงงานผลิตเสื้อ",
    "ติดต่อเรา",
    "สอบถามข้อมูล",
    "ติดต่อบริษัท ธน พลัส 153",
  ],

  // บริการ
  services: [
    "สอบถามราคา",
    "ปรึกษาการสั่งผลิต",
    "ขอใบเสนอราคา",
    "สอบถามการผลิตเสื้อ",
  ],

  // สถานที่
  location: [
    "โรงงานกรุงเทพ",
    "ที่ตั้งโรงงาน",
    "แผนที่โรงงาน",
    "โรงงานเขตดุสิต",
    "สุโขทัย กรุงเทพ",
  ],

  // ช่องทางติดต่อ
  communication: [
    "โทรสอบถาม",
    "อีเมลติดต่อ",
    "Line Official",
    "ติดต่อผ่านฟอร์ม",
  ],
} as const;

// รวมเป็น array สำหรับ metadata
export const contactKeywords = Object.values(CONTACT_KEYWORDS).flat();

export const contactMetadata: Metadata = {
  title: "ติดต่อเรา | โรงงานผลิตเสื้อ",
  description:
    "ติดต่อโรงงานผลิตเสื้อ บริษัท ธน พลัส 153 จำกัด 503 ถ. สุโขทัย เขตดุสิต กรุงเทพฯ โทร 062-497-7952 สอบถามราคา ปรึกษาการสั่งผลิตเสื้อ",
  keywords: contactKeywords,
  authors: [{ name: "โรงงานผลิตเสื้อ" }],
  creator: "โรงงานผลิตเสื้อ",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    title: "ติดต่อเรา | โรงงานผลิตเสื้อ",
    description:
      "ติดต่อโรงงานผลิตเสื้อ บริษัท ธน พลัส 153 จำกัด สอบถามราคา ปรึกษาการสั่งผลิตเสื้อ โทร 062-497-7952",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ติดต่อโรงงานผลิตเสื้อ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ติดต่อเรา | โรงงานผลิตเสื้อ",
    description:
      "ติดต่อโรงงานผลิตเสื้อ สอบถามราคา ปรึกษาการสั่งผลิตเสื้อ โทร 062-497-7952",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
