import type { Metadata } from "next";

const SITE_URL = "https://xn--o3c1bj3b4bj8cd.com";
const SITE_NAME = "โรงงานผลิตเสื้อ | เสื้อยืด เสื้อโปโล ราคาโรงงาน";

export const homeMetadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง รับผลิตเสื้อตามออเดอร์ ส่งตรงจากโรงงาน",
  keywords: [
    "เสื้อยืด",
    "เสื้อโปโล",
    "โรงงานผลิตเสื้อ",
    "เสื้อราคาโรงงาน",
    "รับผลิตเสื้อ",
    "เสื้อยืดราคาถูก",
    "เสื้อโปโลราคาโรงงาน",
    "ผลิตเสื้อตามออเดอร์",
  ],
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
