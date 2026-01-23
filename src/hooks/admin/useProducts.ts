"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

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

export interface ProductFilters {
  type?: "real" | "sample" | "";
  categoryId?: string;
  status?: "draft" | "active" | "inactive" | "";
  featured?: boolean;
  search?: string;
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
  refetch: () => Promise<void>;
  selectProduct: (id: string | null) => void;
  createProduct: (
    data: Partial<Product> & { tagIds?: string[] },
  ) => Promise<Product | null>;
  updateProduct: (
    id: string,
    data: Partial<Product> & { tagIds?: string[] },
  ) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;
}

export function useProducts(
  options: UseProductsOptions = {},
): UseProductsReturn {
  const { initialFilters = {}, limit = 20 } = options;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
    hasNext: false,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("page", pagination.page.toString());
      params.append("limit", limit.toString());

      if (filters.type) params.append("type", filters.type);
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.status) params.append("status", filters.status);
      if (filters.featured) params.append("featured", "true");
      if (searchTerm) params.append("search", searchTerm);

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch products");
      }

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [filters, searchTerm, pagination.page, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Local filtering for instant search
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const searchLower = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.sku?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower),
    );
  }, [products, searchTerm]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const selectProduct = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const createProduct = useCallback(
    async (
      data: Partial<Product> & { tagIds?: string[] },
    ): Promise<Product | null> => {
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to create product");
        }

        await fetchProducts();
        return result.product;
      } catch (err) {
        throw err;
      }
    },
    [fetchProducts],
  );

  const updateProduct = useCallback(
    async (
      id: string,
      data: Partial<Product> & { tagIds?: string[] },
    ): Promise<Product | null> => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to update product");
        }

        await fetchProducts();
        return result.product;
      } catch (err) {
        throw err;
      }
    },
    [fetchProducts],
  );

  const deleteProduct = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.error || "Failed to delete product");
        }

        await fetchProducts();
        return true;
      } catch (err) {
        throw err;
      }
    },
    [fetchProducts],
  );

  return {
    products,
    filteredProducts,
    loading,
    error,
    selectedId,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    pagination,
    setPage,
    refetch: fetchProducts,
    selectProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
