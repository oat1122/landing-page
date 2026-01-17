import bcrypt from "bcryptjs";

/**
 * Hash password ก่อนบันทึกลง DB
 * ใช้ cost factor 12 เพื่อความปลอดภัย
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * ตรวจสอบ password กับ hash ที่เก็บใน DB
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
