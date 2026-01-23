import { z } from "zod";

// Create category schema
export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อหมวดหมู่")
    .max(100, "ชื่อหมวดหมู่ต้องไม่เกิน 100 ตัวอักษร"),
  description: z
    .string()
    .max(500, "คำอธิบายต้องไม่เกิน 500 ตัวอักษร")
    .optional()
    .or(z.literal("")),
  sortOrder: z
    .number()
    .int("ลำดับต้องเป็นจำนวนเต็ม")
    .min(0, "ลำดับต้องไม่ติดลบ")
    .optional(),
});

// Update category schema (same as create)
export const updateCategorySchema = createCategorySchema;

// Export types
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
