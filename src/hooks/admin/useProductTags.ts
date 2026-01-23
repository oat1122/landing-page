"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { api } from "@/lib/api-client";

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
  createdAt: string;
}

interface TagsResponse {
  tags: ProductTag[];
}

interface TagResponse {
  tag: ProductTag;
}

export interface UseProductTagsReturn {
  tags: ProductTag[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  searchTags: (search: string) => Promise<ProductTag[]>;
  createTag: (name: string) => Promise<ProductTag | null>;
  getOrCreateTag: (name: string) => Promise<ProductTag | null>;
  isCreating: boolean;
}

export function useProductTags(): UseProductTagsReturn {
  const queryClient = useQueryClient();

  // Query for fetching all tags
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.productTags.list(),
    queryFn: () => api.get<TagsResponse>("/api/product-tags"),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (name: string) =>
      api.post<TagResponse>("/api/product-tags", { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.productTags.all });
    },
  });

  // Search tags function (uses direct fetch, not cached query)
  const searchTags = async (search: string): Promise<ProductTag[]> => {
    try {
      const result = await api.get<TagsResponse>(
        `/api/product-tags?search=${encodeURIComponent(search)}`,
      );
      return result.tags;
    } catch (err) {
      console.error("Error searching tags:", err);
      return [];
    }
  };

  // Create tag wrapper
  const createTag = async (name: string): Promise<ProductTag | null> => {
    const result = await createMutation.mutateAsync(name);
    return result.tag;
  };

  // Get existing tag or create new one
  const getOrCreateTag = async (name: string): Promise<ProductTag | null> => {
    const trimmedName = name.trim();
    if (!trimmedName) return null;

    const tags = data?.tags ?? [];

    // Check if tag already exists locally
    const existingTag = tags.find(
      (t) => t.name.toLowerCase() === trimmedName.toLowerCase(),
    );
    if (existingTag) return existingTag;

    // Create new tag (API will return existing if found)
    return createTag(trimmedName);
  };

  return {
    tags: data?.tags ?? [],
    loading: isLoading,
    error: queryError ? queryError.message : null,
    refetch: () => refetch(),
    searchTags,
    createTag,
    getOrCreateTag,
    isCreating: createMutation.isPending,
  };
}
