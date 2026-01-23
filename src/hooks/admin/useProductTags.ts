"use client";

import { useState, useEffect, useCallback } from "react";

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
  createdAt: string;
}

export interface UseProductTagsReturn {
  tags: ProductTag[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchTags: (search: string) => Promise<ProductTag[]>;
  createTag: (name: string) => Promise<ProductTag | null>;
  getOrCreateTag: (name: string) => Promise<ProductTag | null>;
}

export function useProductTags(): UseProductTagsReturn {
  const [tags, setTags] = useState<ProductTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/product-tags");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch tags");
      }

      setTags(data.tags);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tags");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const searchTags = useCallback(
    async (search: string): Promise<ProductTag[]> => {
      try {
        const response = await fetch(
          `/api/product-tags?search=${encodeURIComponent(search)}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to search tags");
        }

        return data.tags;
      } catch (err) {
        console.error("Error searching tags:", err);
        return [];
      }
    },
    [],
  );

  const createTag = useCallback(
    async (name: string): Promise<ProductTag | null> => {
      try {
        const response = await fetch("/api/product-tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to create tag");
        }

        await fetchTags();
        return result.tag;
      } catch (err) {
        throw err;
      }
    },
    [fetchTags],
  );

  // Get existing tag or create new one
  const getOrCreateTag = useCallback(
    async (name: string): Promise<ProductTag | null> => {
      const trimmedName = name.trim();
      if (!trimmedName) return null;

      // Check if tag already exists locally
      const existingTag = tags.find(
        (t) => t.name.toLowerCase() === trimmedName.toLowerCase(),
      );
      if (existingTag) return existingTag;

      // Create new tag (API will return existing if found)
      return createTag(trimmedName);
    },
    [tags, createTag],
  );

  return {
    tags,
    loading,
    error,
    refetch: fetchTags,
    searchTags,
    createTag,
    getOrCreateTag,
  };
}
