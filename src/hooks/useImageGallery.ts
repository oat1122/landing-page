"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

export interface ImageData {
  id: string;
  filename: string;
  url: string;
  alt: string;
  title: string | null;
  category: string | null;
  tags: string | null;
  width: number | null;
  height: number | null;
  size: number;
  createdAt: string;
}

export interface UseImageGalleryOptions {
  onSelect?: (image: ImageData) => void;
  selectable?: boolean;
  refreshKey?: number;
}

export interface UseImageGalleryReturn {
  // Data
  images: ImageData[];
  filteredImages: ImageData[];
  allTags: string[];

  // State
  loading: boolean;
  error: string | null;
  copiedId: string | null;
  selectedId: string | null;
  filter: string;

  // Search states
  searchName: string;
  searchTag: string;
  searchDateFrom: string;
  searchDateTo: string;
  showFilters: boolean;
  hasActiveFilters: boolean;

  // Actions
  setFilter: (filter: string) => void;
  setSearchName: (name: string) => void;
  setSearchTag: (tag: string) => void;
  setSearchDateFrom: (date: string) => void;
  setSearchDateTo: (date: string) => void;
  setShowFilters: (show: boolean) => void;
  clearFilters: () => void;
  copyUrl: (url: string, id: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  handleSelect: (image: ImageData) => void;
  refetch: () => Promise<void>;

  // Utilities
  formatSize: (bytes: number) => string;
  formatDate: (dateStr: string) => string;
}

export function useImageGallery({
  onSelect,
  selectable = false,
  refreshKey = 0,
}: UseImageGalleryOptions = {}): UseImageGalleryReturn {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  // Search states
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (filter) params.append("category", filter);

      const response = await fetch(`/api/images?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch images");
      }

      setImages(data.images);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, refreshKey]);

  // Filter images based on search criteria
  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      // Filter by name (alt or filename)
      if (searchName) {
        const searchLower = searchName.toLowerCase();
        const matchesAlt = image.alt.toLowerCase().includes(searchLower);
        const matchesFilename = image.filename
          .toLowerCase()
          .includes(searchLower);
        if (!matchesAlt && !matchesFilename) return false;
      }

      // Filter by tag
      if (searchTag) {
        const searchTagLower = searchTag.toLowerCase();
        if (!image.tags) return false;
        const imageTags = image.tags
          .toLowerCase()
          .split(",")
          .map((t) => t.trim());
        const hasTag = imageTags.some((t) => t.includes(searchTagLower));
        if (!hasTag) return false;
      }

      // Filter by date range
      if (searchDateFrom || searchDateTo) {
        const imageDate = new Date(image.createdAt);
        if (searchDateFrom) {
          const fromDate = new Date(searchDateFrom);
          if (imageDate < fromDate) return false;
        }
        if (searchDateTo) {
          const toDate = new Date(searchDateTo);
          toDate.setHours(23, 59, 59, 999);
          if (imageDate > toDate) return false;
        }
      }

      return true;
    });
  }, [images, searchName, searchTag, searchDateFrom, searchDateTo]);

  // Extract unique tags from all images
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    images.forEach((image) => {
      if (image.tags) {
        image.tags.split(",").forEach((tag) => {
          const trimmed = tag.trim();
          if (trimmed) tagSet.add(trimmed);
        });
      }
    });
    return Array.from(tagSet).sort();
  }, [images]);

  const clearFilters = useCallback(() => {
    setSearchName("");
    setSearchTag("");
    setSearchDateFrom("");
    setSearchDateTo("");
  }, []);

  const hasActiveFilters = Boolean(
    searchName || searchTag || searchDateFrom || searchDateTo,
  );

  const copyUrl = useCallback(async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  const deleteImage = useCallback(async (id: string) => {
    if (!confirm("ต้องการลบรูปภาพนี้หรือไม่?")) return;

    try {
      const response = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      alert(
        "ลบไม่สำเร็จ: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    }
  }, []);

  const handleSelect = useCallback(
    (image: ImageData) => {
      if (selectable) {
        setSelectedId(image.id);
        onSelect?.(image);
      }
    },
    [selectable, onSelect],
  );

  const formatSize = useCallback((bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }, []);

  const formatDate = useCallback((dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, []);

  return {
    // Data
    images,
    filteredImages,
    allTags,

    // State
    loading,
    error,
    copiedId,
    selectedId,
    filter,

    // Search states
    searchName,
    searchTag,
    searchDateFrom,
    searchDateTo,
    showFilters,
    hasActiveFilters,

    // Actions
    setFilter,
    setSearchName,
    setSearchTag,
    setSearchDateFrom,
    setSearchDateTo,
    setShowFilters,
    clearFilters,
    copyUrl,
    deleteImage,
    handleSelect,
    refetch: fetchImages,

    // Utilities
    formatSize,
    formatDate,
  };
}
