"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { api } from "@/lib/api-client";

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  _count: {
    products: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface CategoriesResponse {
  categories: ProductCategory[];
}

interface CategoryResponse {
  category: ProductCategory;
}

interface CreateCategoryInput {
  name: string;
  description?: string;
  sortOrder?: number;
}

interface UpdateCategoryInput {
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface UseCategoriesReturn {
  categories: ProductCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  createCategory: (
    data: CreateCategoryInput,
  ) => Promise<ProductCategory | null>;
  updateCategory: (
    id: string,
    data: UpdateCategoryInput,
  ) => Promise<ProductCategory | null>;
  deleteCategory: (id: string) => Promise<boolean>;
  // Mutation states for UI feedback
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function useCategories(): UseCategoriesReturn {
  const queryClient = useQueryClient();

  // Query for fetching categories
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () => api.get<CategoriesResponse>("/api/categories"),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (input: CreateCategoryInput) =>
      api.post<CategoryResponse>("/api/categories", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryInput }) =>
      api.put<CategoryResponse>(`/api/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });

  // Wrapper functions to maintain API compatibility
  const createCategory = async (
    input: CreateCategoryInput,
  ): Promise<ProductCategory | null> => {
    const result = await createMutation.mutateAsync(input);
    return result.category;
  };

  const updateCategory = async (
    id: string,
    data: UpdateCategoryInput,
  ): Promise<ProductCategory | null> => {
    const result = await updateMutation.mutateAsync({ id, data });
    return result.category;
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    await deleteMutation.mutateAsync(id);
    return true;
  };

  return {
    categories: data?.categories ?? [],
    loading: isLoading,
    error: queryError ? queryError.message : null,
    refetch: () => refetch(),
    createCategory,
    updateCategory,
    deleteCategory,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
