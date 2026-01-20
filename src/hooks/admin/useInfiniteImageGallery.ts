"use client";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo, useCallback } from "react";

export interface ImageData {
  id: string;
  filename: string;
  url: string;
  alt: string;
  title: string | null;
  caption: string | null;
  category: string | null;
  tags: string | null;
  width: number | null;
  height: number | null;
  size: number;
  createdAt: string;
}

interface PaginatedResponse {
  images: ImageData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UseInfiniteImageGalleryOptions {
  onSelect?: (image: ImageData) => void;
  selectable?: boolean;
  refreshKey?: number;
}

export interface UseInfiniteImageGalleryReturn {
  // Data
  images: ImageData[];
  filteredImages: ImageData[];
  allTags: string[];
  totalCount: number;

  // State
  loading: boolean;
  error: string | null;
  copiedId: string | null;
  selectedId: string | null;
  filter: string;
  viewMode: "grid" | "list";

  // Search states
  searchName: string;
  searchTag: string;
  searchDateFrom: string;
  searchDateTo: string;
  showFilters: boolean;
  hasActiveFilters: boolean;

  // Infinite query states
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;

  // Actions
  setFilter: (filter: string) => void;
  setViewMode: (mode: "grid" | "list") => void;
  setSearchName: (name: string) => void;
  setSearchTag: (tag: string) => void;
  setSearchDateFrom: (date: string) => void;
  setSearchDateTo: (date: string) => void;
  setShowFilters: (show: boolean) => void;
  clearFilters: () => void;
  copyUrl: (url: string, id: string) => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  handleSelect: (image: ImageData) => void;
  refetch: () => void;

  // Utilities
  formatSize: (bytes: number) => string;
  formatDate: (dateStr: string) => string;
}

const ITEMS_PER_PAGE = 18;

export function useInfiniteImageGallery({
  onSelect,
  selectable = false,
  refreshKey = 0,
}: UseInfiniteImageGalleryOptions = {}): UseInfiniteImageGalleryReturn {
  const queryClient = useQueryClient();

  // Local state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Search states
  const [searchName, setSearchName] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Build search query based on filters
  const searchQuery = useMemo(() => {
    const parts: string[] = [];

    if (searchName) {
      parts.push(searchName);
    }

    if (searchTag) {
      parts.push(searchTag);
    }

    return parts.join(" ");
  }, [searchName, searchTag]);

  // Fetch function
  const fetchImages = async ({ pageParam = 1 }) => {
    const params = new URLSearchParams();
    params.append("page", pageParam.toString());
    params.append("limit", ITEMS_PER_PAGE.toString());

    if (filter) {
      params.append("category", filter);
    }

    if (searchQuery) {
      params.append("search", searchQuery);
    }

    const response = await fetch(`/api/images?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch images");
    }

    return data as PaginatedResponse;
  };

  // Infinite query
  const {
    data,
    error: queryError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch: refetchQuery,
  } = useInfiniteQuery({
    queryKey: ["images", filter, searchQuery, refreshKey],
    queryFn: fetchImages,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten pages to single array
  const images = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.images);
  }, [data]);

  // Get total count from the first page's pagination data
  const totalCount = useMemo(() => {
    if (!data?.pages?.[0]?.pagination) return 0;
    return data.pages[0].pagination.total;
  }, [data]);

  // Filter images by date range (client-side for now)
  const filteredImages = useMemo(() => {
    if (!searchDateFrom && !searchDateTo) return images;

    return images.filter((image) => {
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

      return true;
    });
  }, [images, searchDateFrom, searchDateTo]);

  // Extract unique tags from all loaded images
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

  const deleteImage = useCallback(
    async (id: string) => {
      if (!confirm("ต้องการลบรูปภาพนี้หรือไม่?")) return;

      try {
        const response = await fetch(`/api/images/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete");
        }

        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["images"] });
      } catch (err) {
        alert(
          "ลบไม่สำเร็จ: " +
            (err instanceof Error ? err.message : "Unknown error"),
        );
      }
    },
    [queryClient],
  );

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

  const refetch = useCallback(() => {
    refetchQuery();
  }, [refetchQuery]);

  return {
    // Data
    images,
    filteredImages,
    allTags,
    totalCount,

    // State
    loading: isLoading,
    error: queryError ? queryError.message : null,
    copiedId,
    selectedId,
    filter,
    viewMode,

    // Search states
    searchName,
    searchTag,
    searchDateFrom,
    searchDateTo,
    showFilters,
    hasActiveFilters,

    // Infinite query states
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },

    // Actions
    setFilter,
    setViewMode,
    setSearchName,
    setSearchTag,
    setSearchDateFrom,
    setSearchDateTo,
    setShowFilters,
    clearFilters,
    copyUrl,
    deleteImage,
    handleSelect,
    refetch,

    // Utilities
    formatSize,
    formatDate,
  };
}
