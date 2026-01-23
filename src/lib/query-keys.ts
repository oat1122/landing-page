/**
 * Centralized Query Keys for TanStack React Query
 *
 * ใช้ factory pattern เพื่อสร้าง query keys ที่ type-safe และ consistent
 * สำหรับ cache management และ invalidation
 */

export interface ProductFilters {
  type?: "real" | "sample" | "";
  categoryId?: string;
  status?: "draft" | "active" | "inactive" | "";
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ImageFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const queryKeys = {
  // Categories
  categories: {
    all: ["categories"] as const,
    list: () => [...queryKeys.categories.all, "list"] as const,
    detail: (id: string) =>
      [...queryKeys.categories.all, "detail", id] as const,
  },

  // Product Tags
  productTags: {
    all: ["product-tags"] as const,
    list: () => [...queryKeys.productTags.all, "list"] as const,
    search: (term: string) =>
      [...queryKeys.productTags.all, "search", term] as const,
  },

  // Products
  products: {
    all: ["products"] as const,
    list: (filters?: ProductFilters) =>
      filters
        ? ([...queryKeys.products.all, "list", filters] as const)
        : ([...queryKeys.products.all, "list"] as const),
    detail: (id: string) => [...queryKeys.products.all, "detail", id] as const,
  },

  // Images
  images: {
    all: ["images"] as const,
    list: (filters?: ImageFilters) =>
      filters
        ? ([...queryKeys.images.all, "list", filters] as const)
        : ([...queryKeys.images.all, "list"] as const),
    infinite: (filters?: Omit<ImageFilters, "page">) =>
      filters
        ? ([...queryKeys.images.all, "infinite", filters] as const)
        : ([...queryKeys.images.all, "infinite"] as const),
  },
} as const;

// Type helpers for query key extraction
export type QueryKeys = typeof queryKeys;
