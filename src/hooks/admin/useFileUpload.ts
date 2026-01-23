"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { imageUploadSchema } from "@/lib/validations/image";

export interface UploadedImage {
  id: string;
  url: string;
  alt: string;
  filename: string;
}

export interface FileWithMeta {
  file: File;
  preview: string;
  alt: string;
  title: string;
  expanded: boolean;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

export interface UseFileUploadOptions {
  onUploadSuccess?: (images: UploadedImage[]) => void;
  onUploadError?: (error: string) => void;
  allowedTypes?: string[];
  maxSize?: number;
}

export interface UseFileUploadReturn {
  // State
  files: FileWithMeta[];
  isUploading: boolean;
  uploadStatus: "idle" | "success" | "error";
  errorMessage: string;
  isDragging: boolean;

  // Shared fields
  sharedCaption: string;
  sharedCategory: string;
  sharedTags: string[];
  tagInput: string;
  existingTags: string[];

  // Counts
  successCount: number;
  pendingCount: number;

  // Ref
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  // Actions
  setSharedCaption: (caption: string) => void;
  setSharedCategory: (category: string) => void;
  setSharedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setTagInput: (input: string) => void;
  handleFilesSelect: (files: FileList | File[]) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  updateFileAlt: (index: number, alt: string) => void;
  updateFileTitle: (index: number, title: string) => void;
  toggleExpanded: (index: number) => void;
  clearAllFiles: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const DEFAULT_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];
const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function useFileUpload({
  onUploadSuccess,
  onUploadError,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  maxSize = DEFAULT_MAX_SIZE,
}: UseFileUploadOptions = {}): UseFileUploadReturn {
  const [files, setFiles] = useState<FileWithMeta[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  // Shared SEO Fields
  const [sharedCaption, setSharedCaption] = useState("");
  const [sharedCategory, setSharedCategory] = useState("");
  const [sharedTags, setSharedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [existingTags, setExistingTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing tags for suggestions
  useEffect(() => {
    const fetchExistingTags = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        if (response.ok && data.images) {
          const tagSet = new Set<string>();
          data.images.forEach((image: { tags: string | null }) => {
            if (image.tags) {
              image.tags.split(",").forEach((tag: string) => {
                const trimmed = tag.trim();
                if (trimmed) tagSet.add(trimmed);
              });
            }
          });
          setExistingTags(Array.from(tagSet).sort());
        }
      } catch (err) {
        console.error("Failed to fetch existing tags:", err);
      }
    };
    fetchExistingTags();
  }, []);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!allowedTypes.includes(file.type)) {
        return "ไฟล์ต้องเป็นรูปภาพเท่านั้น (jpg, png, gif, webp, svg)";
      }
      if (file.size > maxSize) {
        return "ไฟล์ต้องมีขนาดไม่เกิน 5MB";
      }
      return null;
    },
    [allowedTypes, maxSize],
  );

  // Generate alt text from filename
  const generateAltFromFilename = useCallback((filename: string): string => {
    return filename
      .replace(/\.[^/.]+$/, "") // Remove extension
      .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();
  }, []);

  const handleFilesSelect = useCallback(
    (selectedFiles: FileList | File[]) => {
      const filesArray = Array.from(selectedFiles);
      const validFiles: FileWithMeta[] = [];
      const errors: string[] = [];

      filesArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
        } else {
          // Create preview
          const reader = new FileReader();
          reader.onload = (e) => {
            const preview = e.target?.result as string;
            setFiles((prev) => {
              const existingIndex = prev.findIndex(
                (f) => f.file.name === file.name && f.file.size === file.size,
              );
              if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {
                  ...updated[existingIndex],
                  preview,
                };
                return updated;
              }
              return prev;
            });
          };
          reader.readAsDataURL(file);

          validFiles.push({
            file,
            preview: "", // Will be set by reader
            alt: generateAltFromFilename(file.name),
            title: "",
            expanded: false,
            status: "pending",
          });
        }
      });

      if (errors.length > 0) {
        setErrorMessage(errors.join("\n"));
      } else {
        setErrorMessage("");
      }

      if (validFiles.length > 0) {
        setFiles((prev) => [...prev, ...validFiles]);
        setUploadStatus("idle");
      }
    },
    [validateFile, generateAltFromFilename],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = e.dataTransfer.files;
      if (droppedFiles.length > 0) {
        handleFilesSelect(droppedFiles);
      }
    },
    [handleFilesSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files;
      if (selectedFiles && selectedFiles.length > 0) {
        handleFilesSelect(selectedFiles);
      }
      // Reset input value to allow selecting same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFilesSelect],
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateFileAlt = useCallback((index: number, alt: string) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], alt };
      return updated;
    });
  }, []);

  const updateFileTitle = useCallback((index: number, title: string) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], title };
      return updated;
    });
  }, []);

  const toggleExpanded = useCallback((index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        expanded: !updated[index].expanded,
      };
      return updated;
    });
  }, []);

  const clearAllFiles = useCallback(() => {
    setFiles([]);
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (files.length === 0) {
        setErrorMessage("กรุณาเลือกไฟล์รูปภาพ");
        return;
      }

      // Validate all files with Zod schema
      for (const fileData of files) {
        const validationResult = imageUploadSchema.safeParse({
          alt: fileData.alt,
          title: fileData.title || undefined,
          caption: sharedCaption || undefined,
          category: sharedCategory || undefined,
          tags: sharedTags.length > 0 ? sharedTags.join(",") : undefined,
        });

        if (!validationResult.success) {
          const firstError = validationResult.error.issues[0];
          setErrorMessage(`${fileData.file.name}: ${firstError.message}`);
          return;
        }
      }

      setIsUploading(true);
      setErrorMessage("");

      // Update all files to uploading status
      setFiles((prev) =>
        prev.map((f) => ({ ...f, status: "uploading" as const })),
      );

      const uploadedImages: UploadedImage[] = [];
      const errors: string[] = [];

      // Upload all files
      await Promise.all(
        files.map(async (fileData, index) => {
          try {
            const formData = new FormData();
            formData.append("file", fileData.file);
            formData.append("alt", fileData.alt);
            if (fileData.title) formData.append("title", fileData.title);
            if (sharedCaption) formData.append("caption", sharedCaption);
            if (sharedCategory) formData.append("category", sharedCategory);
            if (sharedTags.length > 0)
              formData.append("tags", sharedTags.join(","));

            const response = await fetch("/api/images", {
              method: "POST",
              body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error || "Upload failed");
            }

            uploadedImages.push(data.image);

            setFiles((prev) => {
              const updated = [...prev];
              updated[index] = { ...updated[index], status: "success" };
              return updated;
            });
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "Upload failed";
            errors.push(`${fileData.file.name}: ${message}`);

            setFiles((prev) => {
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                status: "error",
                error: message,
              };
              return updated;
            });
          }
        }),
      );

      setIsUploading(false);

      if (errors.length > 0) {
        setErrorMessage(errors.join("\n"));
        setUploadStatus("error");
        onUploadError?.(errors.join(", "));
      }

      if (uploadedImages.length > 0) {
        if (errors.length === 0) {
          setUploadStatus("success");
        }
        onUploadSuccess?.(uploadedImages);

        // Reset form after success (only if all succeeded)
        if (errors.length === 0) {
          setTimeout(() => {
            clearAllFiles();
            setSharedCaption("");
            setSharedCategory("");
            setSharedTags([]);
            setUploadStatus("idle");
          }, 2000);
        }
      }
    },
    [
      files,
      sharedCaption,
      sharedCategory,
      sharedTags,
      onUploadSuccess,
      onUploadError,
      clearAllFiles,
    ],
  );

  const successCount = files.filter((f) => f.status === "success").length;
  const pendingCount = files.filter(
    (f) => f.status === "pending" || f.status === "uploading",
  ).length;

  return {
    // State
    files,
    isUploading,
    uploadStatus,
    errorMessage,
    isDragging,

    // Shared fields
    sharedCaption,
    sharedCategory,
    sharedTags,
    tagInput,
    existingTags,

    // Counts
    successCount,
    pendingCount,

    // Ref
    fileInputRef,

    // Actions
    setSharedCaption,
    setSharedCategory,
    setSharedTags,
    setTagInput,
    handleFilesSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
    removeFile,
    updateFileAlt,
    updateFileTitle,
    toggleExpanded,
    clearAllFiles,
    handleSubmit,
  };
}
