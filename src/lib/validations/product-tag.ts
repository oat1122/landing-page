import { z } from "zod";

// Create product tag schema
export const createProductTagSchema = z.object({
  name: z
    .string()
    .min(1, "กรุณากรอกชื่อ Tag")
    .max(50, "ชื่อ Tag ต้องไม่เกิน 50 ตัวอักษร"),
});

// Export types
export type CreateProductTagInput = z.infer<typeof createProductTagSchema>;
