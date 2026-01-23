"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertCircle, Check, X, Tag as TagIcon } from "lucide-react";
import Image from "next/image";
import Modal from "@/components/shared/Modal";
import { ImageData } from "@/hooks/admin/useImageGallery";
import { imageUpdateSchema } from "@/lib/validations/image";

interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageData | null;
  onSuccess: () => void;
}

export default function EditImageModal({
  isOpen,
  onClose,
  image,
  onSuccess,
}: EditImageModalProps) {
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [existingTags, setExistingTags] = useState<string[]>([]);

  // Load existing tags from database
  useEffect(() => {
    if (isOpen) {
      fetch("/api/images")
        .then((res) => res.json())
        .then((data) => {
          const allTags = new Set<string>();
          data.images?.forEach((img: ImageData) => {
            if (img.tags) {
              img.tags.split(",").forEach((tag) => {
                const trimmed = tag.trim();
                if (trimmed) allTags.add(trimmed);
              });
            }
          });
          setExistingTags(Array.from(allTags).sort());
        })
        .catch(() => {
          // Ignore errors for tag loading
        });
    }
  }, [isOpen]);

  // Initialize form with image data
  useEffect(() => {
    if (image) {
      setAlt(image.alt || "");
      setTitle(image.title || "");
      setCaption(image.caption || "");
      setCategory(image.category || "");
      setTags(image.tags ? image.tags.split(",").map((t) => t.trim()) : []);
      setTagInput("");
      setError("");
      setSuccess(false);
    }
  }, [image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!image) return;

    // Prepare data for validation
    const formData = {
      alt: alt.trim(),
      title: title.trim() || null,
      caption: caption.trim() || null,
      category: category || null,
      tags: tags.length > 0 ? tags.join(", ") : null,
    };

    // Validate with Zod schema
    const validationResult = imageUpdateSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      setError(firstError.message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/images/${image.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alt: alt.trim(),
          title: title.trim() || null,
          caption: caption.trim() || null,
          category: category || null,
          tags: tags.length > 0 ? tags.join(", ") : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update image");
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="แก้ไขข้อมูลรูปภาพ"
      size="lg"
      closeOnOverlay={!isLoading}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Preview */}
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 600px"
            unoptimized
          />
        </div>

        {/* Alt Text - Required */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alt Text <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="อธิบายรูปภาพ..."
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
            required
          />
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
            placeholder="ข้อความเมื่อ hover..."
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
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
            placeholder="คำอธิบายรูปภาพเพิ่มเติม..."
            disabled={isLoading}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
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
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-50"
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
            Tags
          </label>

          {/* Tag boxes */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    disabled={isLoading}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer disabled:opacity-50"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Tag Input with Autocomplete */}
          <div className="relative">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => {
                const value = e.target.value;
                // Check if comma is typed
                if (value.includes(",")) {
                  const newTag = value.replace(",", "").trim();
                  handleAddTag(newTag);
                } else {
                  setTagInput(value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag(tagInput);
                }
                // Backspace to remove last tag when input is empty
                if (
                  e.key === "Backspace" &&
                  tagInput === "" &&
                  tags.length > 0
                ) {
                  handleRemoveTag(tags.length - 1);
                }
              }}
              placeholder="พิมพ์แล้วกด Enter เพื่อเพิ่ม tag"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
            />

            {/* Custom Dropdown */}
            {tagInput.length > 0 &&
              existingTags.filter(
                (tag) =>
                  !tags.includes(tag) &&
                  tag.toLowerCase().includes(tagInput.toLowerCase()),
              ).length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {existingTags
                    .filter(
                      (tag) =>
                        !tags.includes(tag) &&
                        tag.toLowerCase().includes(tagInput.toLowerCase()),
                    )
                    .map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleAddTag(tag)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <TagIcon className="w-3 h-3 text-gray-400" />
                          {tag}
                        </span>
                      </button>
                    ))}
                </div>
              )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="w-5 h-5" />
            <span className="text-sm">บันทึกข้อมูลสำเร็จ!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            disabled={isLoading || !alt.trim()}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังบันทึก...
              </>
            ) : (
              "บันทึกการเปลี่ยนแปลง"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
