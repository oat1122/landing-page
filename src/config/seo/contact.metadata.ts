import type { Metadata } from "next";

const SITE_URL = "https://xn--o3c1bj3b4bj8cd.com";
const SITE_NAME = "โรงงานผลิตเสื้อ | เสื้อยืด เสื้อโปโล ราคาโรงงาน";

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
