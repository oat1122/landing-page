"use client";

import { useState, useEffect, useCallback } from "react";

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

export interface UseCategoriesReturn {
  categories: ProductCategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createCategory: (data: {
    name: string;
    description?: string;
    sortOrder?: number;
  }) => Promise<ProductCategory | null>;
  updateCategory: (
    id: string,
    data: { name: string; description?: string; sortOrder?: number },
  ) => Promise<ProductCategory | null>;
  deleteCategory: (id: string) => Promise<boolean>;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/categories");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch categories");
      }

      setCategories(data.categories);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(
    async (data: {
      name: string;
      description?: string;
      sortOrder?: number;
    }): Promise<ProductCategory | null> => {
      try {
        const response = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to create category");
        }

        // Refetch to get updated list
        await fetchCategories();
        return result.category;
      } catch (err) {
        throw err;
      }
    },
    [fetchCategories],
  );

  const updateCategory = useCallback(
    async (
      id: string,
      data: { name: string; description?: string; sortOrder?: number },
    ): Promise<ProductCategory | null> => {
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to update category");
        }

        await fetchCategories();
        return result.category;
      } catch (err) {
        throw err;
      }
    },
    [fetchCategories],
  );

  const deleteCategory = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Failed to delete category");
        }

        await fetchCategories();
        return true;
      } catch (err) {
        throw err;
      }
    },
    [fetchCategories],
  );

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
