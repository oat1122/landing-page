import { z } from "zod";

// Allowed image MIME types
export const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
] as const;

// Max file size (5MB)
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

// Image file validation schema (for client-side)
export const imageFileSchema = z.object({
  size: z.number().max(MAX_IMAGE_SIZE, "ไฟล์ต้องมีขนาดไม่เกิน 5MB"),
  type: z
    .string()
    .refine(
      (type) =>
        allowedImageTypes.includes(type as (typeof allowedImageTypes)[number]),
      "ไฟล์ต้องเป็นรูปภาพเท่านั้น (jpg, png, gif, webp, svg)",
    ),
});

// Image upload schema (for POST /api/images)
export const imageUploadSchema = z.object({
  alt: z
    .string()
    .min(1, "กรุณากรอก Alt Text สำหรับ SEO")
    .max(200, "Alt Text ต้องไม่เกิน 200 ตัวอักษร"),
  title: z
    .string()
    .max(200, "Title ต้องไม่เกิน 200 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  caption: z
    .string()
    .max(500, "Caption ต้องไม่เกิน 500 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(2000, "Description ต้องไม่เกิน 2000 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  category: z
    .string()
    .max(50, "หมวดหมู่ต้องไม่เกิน 50 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  tags: z
    .string()
    .max(500, "Tags ต้องไม่เกิน 500 ตัวอักษร")
    .optional()
    .or(z.literal("")),
});

// Image update schema (for PUT /api/images/[id])
export const imageUpdateSchema = z.object({
  alt: z
    .string()
    .min(1, "กรุณากรอก Alt Text สำหรับ SEO")
    .max(200, "Alt Text ต้องไม่เกิน 200 ตัวอักษร"),
  title: z
    .string()
    .max(200, "Title ต้องไม่เกิน 200 ตัวอักษร")
    .nullable()
    .optional(),
  caption: z
    .string()
    .max(500, "Caption ต้องไม่เกิน 500 ตัวอักษร")
    .nullable()
    .optional(),
  description: z
    .string()
    .max(2000, "Description ต้องไม่เกิน 2000 ตัวอักษร")
    .nullable()
    .optional(),
  category: z
    .string()
    .max(50, "หมวดหมู่ต้องไม่เกิน 50 ตัวอักษร")
    .nullable()
    .optional(),
  tags: z
    .string()
    .max(500, "Tags ต้องไม่เกิน 500 ตัวอักษร")
    .nullable()
    .optional(),
  usedIn: z.string().nullable().optional(),
});

// Export types
export type ImageUploadInput = z.infer<typeof imageUploadSchema>;
export type ImageUpdateInput = z.infer<typeof imageUpdateSchema>;
