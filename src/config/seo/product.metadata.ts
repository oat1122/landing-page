import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "./home.metadata";

// ===== Product Keywords =====
export const PRODUCT_KEYWORDS = {
  // ประเภทสินค้า
  types: ["สินค้าจริง", "สินค้าตัวอย่าง", "ตัวอย่างเสื้อ"],

  // สินค้าหลัก
  products: [
    "เสื้อยืด",
    "เสื้อโปโล",
    "เสื้อยูนิฟอร์ม",
    "เสื้อพนักงาน",
    "เสื้อทีม",
  ],

  // คุณสมบัติ
  features: ["เสื้อราคาโรงงาน", "เสื้อคุณภาพดี", "เสื้อตัดเย็บดี", "ผ้าคุณภาพ"],

  // บริการ
  services: ["สั่งผลิตเสื้อ", "รับผลิตเสื้อ", "สั่งซื้อเสื้อ"],
} as const;

export const productKeywords = Object.values(PRODUCT_KEYWORDS).flat();

// ===== Product Page Metadata =====
export const productPageMetadata: Metadata = {
  title: "สินค้า",
  description:
    "รวมสินค้าเสื้อคุณภาพจากโรงงาน เสื้อยืด เสื้อโปโล ยูนิฟอร์ม ราคาโรงงาน พร้อมตัวอย่างสินค้า",
  keywords: productKeywords,
  openGraph: {
    title: `สินค้า | ${SITE_NAME}`,
    description:
      "รวมสินค้าเสื้อคุณภาพจากโรงงาน เสื้อยืด เสื้อโปโล ยูนิฟอร์ม ราคาโรงงาน",
    url: `${SITE_URL}/products`,
    siteName: SITE_NAME,
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `สินค้า | ${SITE_NAME}`,
    description: "รวมสินค้าเสื้อคุณภาพจากโรงงาน เสื้อยืด เสื้อโปโล ยูนิฟอร์ม",
  },
  alternates: {
    canonical: "/products",
  },
};

// ===== Generate Dynamic Product Metadata =====
interface ProductData {
  name: string;
  slug: string;
  description?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  mainImage?: {
    url: string;
    alt: string;
    width?: number | null;
    height?: number | null;
  } | null;
  category?: {
    name: string;
    slug: string;
  } | null;
  price?: number | null;
}

export function generateProductMetadata(product: ProductData): Metadata {
  const title = product.metaTitle || product.name;
  const description =
    product.metaDescription ||
    product.description ||
    `${product.name} - สินค้าคุณภาพจากโรงงานผลิตเสื้อ ราคาโรงงาน`;

  const images = product.mainImage
    ? [
        {
          url: product.mainImage.url.startsWith("http")
            ? product.mainImage.url
            : `${SITE_URL}${product.mainImage.url}`,
          width: product.mainImage.width || 800,
          height: product.mainImage.height || 600,
          alt: product.mainImage.alt || product.name,
        },
      ]
    : undefined;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.category?.name || "",
      ...productKeywords.slice(0, 5),
    ].filter(Boolean),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/products/${product.slug}`,
      siteName: SITE_NAME,
      locale: "th_TH",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: images?.map((img) => img.url),
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}

// ===== Generate Product Category Metadata =====
interface CategoryData {
  name: string;
  slug: string;
  description?: string | null;
}

export function generateCategoryMetadata(category: CategoryData): Metadata {
  const description =
    category.description ||
    `สินค้าหมวดหมู่${category.name} จากโรงงานผลิตเสื้อ ราคาโรงงาน คุณภาพดี`;

  return {
    title: category.name,
    description,
    openGraph: {
      title: `${category.name} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/products/category/${category.slug}`,
      siteName: SITE_NAME,
      locale: "th_TH",
      type: "website",
    },
    alternates: {
      canonical: `/products/category/${category.slug}`,
    },
  };
}

// ===== Generate Product Tag Metadata (For tag search pages) =====
interface TagData {
  name: string;
  slug: string;
}

export function generateTagMetadata(tag: TagData): Metadata {
  const title = `สินค้าที่ติด Tag: ${tag.name}`;
  const description = `รวมสินค้าที่มี Tag "${tag.name}" จากโรงงานผลิตเสื้อ ราคาโรงงาน คุณภาพดี`;

  return {
    title,
    description,
    keywords: [tag.name, ...productKeywords.slice(0, 5)],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/products/tag/${tag.slug}`,
      siteName: SITE_NAME,
      locale: "th_TH",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: `/products/tag/${tag.slug}`,
    },
  };
}

// ===== Include tags in Product Metadata =====
interface ProductDataWithTags extends ProductData {
  tags?: { name: string; slug: string }[];
}

export function generateProductMetadataWithTags(
  product: ProductDataWithTags,
): Metadata {
  const baseMetadata = generateProductMetadata(product);
  const tagNames = product.tags?.map((t) => t.name) || [];

  return {
    ...baseMetadata,
    keywords: [
      product.name,
      product.category?.name || "",
      ...tagNames,
      ...productKeywords.slice(0, 3),
    ].filter(Boolean),
  };
}
