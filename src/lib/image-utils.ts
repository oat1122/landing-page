// src/lib/image-utils.ts
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

// Allowed file types
export const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
];
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Upload directory
export const UPLOAD_DIR = "public/uploads/images";
export const UPLOAD_URL_PREFIX = "/uploads/images";

/**
 * Validate image file
 */
export function validateImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: "ไฟล์ต้องเป็นรูปภาพเท่านั้น (jpg, png, gif, webp, svg)",
    };
  }

  // Check extension
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { valid: false, error: "นามสกุลไฟล์ไม่ถูกต้อง" };
  }

  // Check size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "ไฟล์ต้องมีขนาดไม่เกิน 5MB" };
  }

  return { valid: true };
}

/**
 * Generate unique filename
 */
export function generateFilename(originalName: string): string {
  const ext = path.extname(originalName).toLowerCase();
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}${ext}`;
}

/**
 * Get year/month path for organizing uploads
 */
export function getDatePath(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}/${month}`;
}

/**
 * Ensure directory exists
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/**
 * Get image metadata using sharp
 */
export async function getImageMetadata(buffer: Buffer): Promise<{
  width: number | undefined;
  height: number | undefined;
  format: string | undefined;
}> {
  try {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    };
  } catch {
    return { width: undefined, height: undefined, format: undefined };
  }
}

/**
 * Process and optimize image (convert to WebP for non-SVG)
 */
export async function processImage(
  buffer: Buffer,
  mimeType: string,
): Promise<{ buffer: Buffer; mimeType: string; extension: string }> {
  // Don't process SVG files
  if (mimeType === "image/svg+xml") {
    return { buffer, mimeType, extension: ".svg" };
  }

  // Convert to WebP for better compression
  const processedBuffer = await sharp(buffer).webp({ quality: 85 }).toBuffer();

  return {
    buffer: processedBuffer,
    mimeType: "image/webp",
    extension: ".webp",
  };
}

/**
 * Save image to disk
 */
export async function saveImageToFile(
  buffer: Buffer,
  filename: string,
  datePath: string,
): Promise<string> {
  const fullPath = path.join(process.cwd(), UPLOAD_DIR, datePath);
  await ensureDirectory(fullPath);

  const filePath = path.join(fullPath, filename);
  await fs.writeFile(filePath, buffer);

  return path.join(datePath, filename);
}

/**
 * Delete image from disk
 */
export async function deleteImageFile(filepath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), UPLOAD_DIR, filepath);
  try {
    await fs.unlink(fullPath);
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
}

/**
 * Get full URL for an image
 */
export function getImageUrl(filepath: string): string {
  return `${UPLOAD_URL_PREFIX}/${filepath}`;
}
