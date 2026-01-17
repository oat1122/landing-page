"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  X,
  ImageIcon,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

interface ImageUploadFormProps {
  onUploadSuccess?: (image: UploadedImage) => void;
  onUploadError?: (error: string) => void;
}

interface UploadedImage {
  id: string;
  url: string;
  alt: string;
  filename: string;
}

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function ImageUploadForm({
  onUploadSuccess,
  onUploadError,
}: ImageUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  // SEO Fields
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "ไฟล์ต้องเป็นรูปภาพเท่านั้น (jpg, png, gif, webp, svg)";
    }
    if (file.size > MAX_SIZE) {
      return "ไฟล์ต้องมีขนาดไม่เกิน 5MB";
    }
    return null;
  }, []);

  const handleFileSelect = useCallback(
    (selectedFile: File) => {
      const error = validateFile(selectedFile);
      if (error) {
        setErrorMessage(error);
        setUploadStatus("error");
        return;
      }

      setFile(selectedFile);
      setErrorMessage("");
      setUploadStatus("idle");

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    },
    [validateFile],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("กรุณาเลือกไฟล์รูปภาพ");
      return;
    }

    if (!alt.trim()) {
      setErrorMessage("กรุณากรอก Alt Text สำหรับ SEO");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("alt", alt);
      if (title) formData.append("title", title);
      if (caption) formData.append("caption", caption);
      if (category) formData.append("category", category);
      if (tags) formData.append("tags", tags);

      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setUploadStatus("success");
      onUploadSuccess?.(data.image);

      // Reset form after success
      setTimeout(() => {
        clearFile();
        setAlt("");
        setTitle("");
        setCaption("");
        setCategory("");
        setTags("");
        setUploadStatus("idle");
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setErrorMessage(message);
      setUploadStatus("error");
      onUploadError?.(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {/* File Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          }
          ${preview ? "border-green-500 bg-green-50" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-md"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="mt-2 text-sm text-gray-600">{file?.name}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-4 bg-gray-200 rounded-full">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์
              </p>
              <p className="text-sm text-gray-500 mt-1">
                รองรับ JPG, PNG, GIF, WebP, SVG (ไม่เกิน 5MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Message */}
      {uploadStatus === "success" && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <Check className="w-5 h-5" />
          <span>อัพโหลดสำเร็จ!</span>
        </div>
      )}

      {/* SEO Fields */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-lg">🔍</span> SEO & Metadata
        </h3>

        {/* Alt Text - Required */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="อธิบายรูปภาพสำหรับ SEO และ Accessibility"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            จำเป็นสำหรับ SEO และผู้ใช้งาน screen reader
          </p>
        </div>

        {/* Title - Optional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title (ไม่บังคับ)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ข้อความที่แสดงเมื่อ hover"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Caption - Optional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caption (ไม่บังคับ)
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="คำอธิบายรูปภาพเพิ่มเติม"
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            <option value="product">Product</option>
            <option value="blog">Blog</option>
            <option value="banner">Banner</option>
            <option value="gallery">Gallery</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (คั่นด้วย comma)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="เช่น: tshirt, polo, fashion, summer"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!file || !alt.trim() || isUploading}
        className={`
          w-full py-3 px-6 rounded-lg font-semibold text-white
          flex items-center justify-center gap-2
          transition-all duration-200
          ${
            !file || !alt.trim() || isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          }
        `}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            กำลังอัพโหลด...
          </>
        ) : (
          <>
            <Upload className="w-5 h-5" />
            อัพโหลดรูปภาพ
          </>
        )}
      </button>
    </form>
  );
}
