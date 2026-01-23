"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import { queryKeys, type ProductFilters } from "@/lib/query-keys";
import { api } from "@/lib/api-client";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  price: number | null;
  comparePrice: number | null;
  type: "real" | "sample";
  mainImage: ProductImage | null;
  mainImageId: string | null;
  category: ProductCategory | null;
  categoryId: string | null;
  tags: ProductTag[];
  metaTitle: string | null;
  metaDescription: string | null;
  status: "draft" | "active" | "inactive";
  featured: boolean;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

interface ProductResponse {
  product: Product;
}

export interface UseProductsOptions {
  initialFilters?: ProductFilters;
  limit?: number;
}

export interface UseProductsReturn {
  // Data
  products: Product[];
  filteredProducts: Product[];

  // State
  loading: boolean;
  error: string | null;
  selectedId: string | null;

  // Filters
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Pagination
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
  setPage: (page: number) => void;

  // Actions
  refetch: () => void;
  selectProduct: (id: string | null) => void;
  createProduct: (
    data: Partial<Product> & { tagIds?: string[] },
  ) => Promise<Product | null>;
  updateProduct: (
    id: string,
    data: Partial<Product> & { tagIds?: string[] },
  ) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;

  // Mutation states
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function useProducts(
  options: UseProductsOptions = {},
): UseProductsReturn {
  const { initialFilters = {}, limit = 20 } = options;
  const queryClient = useQueryClient();

  // Local state for filters and pagination
  const [filters, setFiltersState] = useState<ProductFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Build query params
  const queryFilters: ProductFilters = useMemo(
    () => ({
      ...filters,
      search: searchTerm || undefined,
      page,
      limit,
    }),
    [filters, searchTerm, page, limit],
  );

  // Query for fetching products
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.products.list(queryFilters),
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      if (filters.type) params.append("type", filters.type);
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.status) params.append("status", filters.status);
      if (filters.featured) params.append("featured", "true");
      if (searchTerm) params.append("search", searchTerm);

      return api.get<ProductsResponse>(`/api/products?${params.toString()}`);
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (input: Partial<Product> & { tagIds?: string[] }) =>
      api.post<ProductResponse>("/api/products", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Product> & { tagIds?: string[] };
    }) => api.put<ProductResponse>(`/api/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/api/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });

  // Set filters and reset page
  const setFilters = useCallback((newFilters: ProductFilters) => {
    setFiltersState(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);

  // Local filtering for instant search
  const filteredProducts = useMemo(() => {
    const products = data?.products ?? [];
    if (!searchTerm) return products;

    const searchLower = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.sku?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower),
    );
  }, [data?.products, searchTerm]);

  // Wrapper functions
  const createProduct = async (
    input: Partial<Product> & { tagIds?: string[] },
  ): Promise<Product | null> => {
    const result = await createMutation.mutateAsync(input);
    return result.product;
  };

  const updateProduct = async (
    id: string,
    input: Partial<Product> & { tagIds?: string[] },
  ): Promise<Product | null> => {
    const result = await updateMutation.mutateAsync({ id, data: input });
    return result.product;
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    await deleteMutation.mutateAsync(id);
    return true;
  };

  const selectProduct = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  return {
    products: data?.products ?? [],
    filteredProducts,
    loading: isLoading,
    error: queryError ? queryError.message : null,
    selectedId,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    pagination: data?.pagination ?? {
      page: 1,
      limit,
      total: 0,
      totalPages: 0,
      hasNext: false,
    },
    setPage,
    refetch: () => refetch(),
    selectProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
