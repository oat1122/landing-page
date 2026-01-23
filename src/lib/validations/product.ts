import { z } from "zod";

// Product type enum
export const productTypeEnum = z.enum(["real", "sample"]);

// Product status enum
export const productStatusEnum = z.enum(["draft", "active", "inactive"]);

// Product form validation schema
export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อสินค้า")
    .max(200, "ชื่อสินค้าต้องไม่เกิน 200 ตัวอักษร"),
  slug: z
    .string()
    .max(250, "Slug ต้องไม่เกิน 250 ตัวอักษร")
    .regex(
      /^[a-z0-9-]*$/,
      "Slug ต้องเป็นตัวพิมพ์เล็ก ตัวเลข และขีดกลางเท่านั้น",
    )
    .optional()
    .or(z.literal("")),
  sku: z
    .string()
    .max(100, "SKU ต้องไม่เกิน 100 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(5000, "รายละเอียดต้องไม่เกิน 5000 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  price: z
    .number()
    .min(0, "ราคาต้องไม่ติดลบ")
    .max(99999999.99, "ราคาสูงเกินไป")
    .nullable()
    .optional(),
  comparePrice: z
    .number()
    .min(0, "ราคาเปรียบเทียบต้องไม่ติดลบ")
    .max(99999999.99, "ราคาสูงเกินไป")
    .nullable()
    .optional(),
  type: productTypeEnum.default("real"),
  mainImageId: z
    .string()
    .uuid("รูปแบบ ID รูปภาพไม่ถูกต้อง")
    .nullable()
    .optional(),
  categoryId: z
    .string()
    .uuid("รูปแบบ ID หมวดหมู่ไม่ถูกต้อง")
    .nullable()
    .optional(),
  tagIds: z.array(z.string().uuid("รูปแบบ ID แท็กไม่ถูกต้อง")).optional(),
  metaTitle: z
    .string()
    .max(70, "Meta Title ควรไม่เกิน 70 ตัวอักษรเพื่อ SEO ที่ดี")
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "Meta Description ควรไม่เกิน 160 ตัวอักษรเพื่อ SEO ที่ดี")
    .optional()
    .or(z.literal("")),
  status: productStatusEnum.default("draft"),
  featured: z.boolean().default(false),
});

// Create product schema (name is required)
export const createProductSchema = productFormSchema;

// Update product schema (same as create)
export const updateProductSchema = productFormSchema.partial().extend({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อสินค้า")
    .max(200, "ชื่อสินค้าต้องไม่เกิน 200 ตัวอักษร"),
});

// API-specific schemas (for backend validation)
export const createProductApiSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อสินค้า")
    .max(200, "ชื่อสินค้าต้องไม่เกิน 200 ตัวอักษร"),
  slug: z
    .string()
    .max(250, "Slug ต้องไม่เกิน 250 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  sku: z
    .string()
    .max(100, "SKU ต้องไม่เกิน 100 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(5000, "รายละเอียดต้องไม่เกิน 5000 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  price: z
    .number()
    .min(0, "ราคาต้องไม่ติดลบ")
    .max(99999999.99, "ราคาสูงเกินไป")
    .nullable()
    .optional(),
  comparePrice: z
    .number()
    .min(0, "ราคาเปรียบเทียบต้องไม่ติดลบ")
    .max(99999999.99, "ราคาสูงเกินไป")
    .nullable()
    .optional(),
  type: productTypeEnum.optional(),
  mainImageId: z
    .string()
    .uuid("รูปแบบ ID รูปภาพไม่ถูกต้อง")
    .nullable()
    .optional(),
  categoryId: z
    .string()
    .uuid("รูปแบบ ID หมวดหมู่ไม่ถูกต้อง")
    .nullable()
    .optional(),
  tagIds: z.array(z.string().uuid("รูปแบบ ID แท็กไม่ถูกต้อง")).optional(),
  metaTitle: z
    .string()
    .max(70, "Meta Title ควรไม่เกิน 70 ตัวอักษรเพื่อ SEO ที่ดี")
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "Meta Description ควรไม่เกิน 160 ตัวอักษรเพื่อ SEO ที่ดี")
    .optional()
    .or(z.literal("")),
  status: productStatusEnum.optional(),
  featured: z.boolean().optional(),
});

export const updateProductApiSchema = createProductApiSchema;

// Export types
export type ProductFormInput = z.infer<typeof productFormSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateProductApiInput = z.infer<typeof createProductApiSchema>;
export type UpdateProductApiInput = z.infer<typeof updateProductApiSchema>;
export type ProductType = z.infer<typeof productTypeEnum>;
export type ProductStatus = z.infer<typeof productStatusEnum>;
