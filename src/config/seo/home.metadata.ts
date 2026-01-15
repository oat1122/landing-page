import type { Metadata } from "next";

const SITE_URL = "https://xn--o3c1bj3b4bj8cd.com";
const SITE_NAME = "โรงงานผลิตเสื้อ | เสื้อยืด เสื้อโปโล ราคาโรงงาน";

// ===== Keywords จัดหมวดหมู่ =====
// แก้ไขได้ง่าย เพิ่ม/ลบ keywords ในหมวดที่เหมาะสม
export const HOME_KEYWORDS = {
  // สินค้าหลัก (จาก HeroSection, ProductsSection)
  products: ["เสื้อยืด", "เสื้อโปโล", "ยูนิฟอร์มพนักงาน"],

  // วัสดุผ้า (จาก FabricGuideSection)
  fabrics: ["ผ้า Cotton 100%", "ผ้า TC", "ผ้า CVC"],

  // บริการโรงงาน
  factory: ["โรงงานผลิตเสื้อ", "รับผลิตเสื้อ", "ผลิตเสื้อตามออเดอร์"],

  // ราคา
  pricing: ["เสื้อราคาโรงงาน", "เสื้อยืดราคาถูก", "เสื้อโปโลราคาโรงงาน"],

  // Long-tail Keywords (จาก FAQSection)
  longTail: [
    "สั่งเสื้อขั้นต่ำกี่ตัว",
    "ผลิตเสื้อใช้เวลากี่วัน",
    "บริการออกแบบเสื้อฟรี",
  ],

  // บริการ (จาก ProcessSection, WhyChooseUs)
  services: [
    "ออกแบบเสื้อ",
    "สกรีนเสื้อ",
    "ปักเสื้อ",
    "พิมพ์ DTG",
    "ผลิตเสื้อด่วน",
    "QC ตรวจสอบคุณภาพ",
  ],
} as const;

// รวมเป็น array สำหรับ metadata
export const homeKeywords = Object.values(HOME_KEYWORDS).flat();

export const homeMetadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง รับผลิตเสื้อตามออเดอร์ ส่งตรงจากโรงงาน",
  keywords: homeKeywords,
  authors: [{ name: "โรงงานผลิตเสื้อ" }],
  creator: "โรงงานผลิตเสื้อ",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง รับผลิตเสื้อตามออเดอร์",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "โรงงานผลิตเสื้อ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง",
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

export { SITE_URL, SITE_NAME };
