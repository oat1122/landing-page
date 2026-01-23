/**
 * Typed API Client for TanStack React Query
 *
 * Provides a consistent interface for making API calls with proper error handling
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiClientOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

/**
 * Generic API client function with type inference
 *
 * @example
 * // GET request
 * const { categories } = await apiClient<{ categories: Category[] }>('/api/categories');
 *
 * @example
 * // POST request
 * const { category } = await apiClient<{ category: Category }>('/api/categories', {
 *   method: 'POST',
 *   body: { name: 'New Category' }
 * });
 */
export async function apiClient<T>(
  endpoint: string,
  options?: ApiClientOptions,
): Promise<T> {
  const { body, headers, ...restOptions } = options || {};

  const config: RequestInit = {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.error || data.message || "API request failed",
      response.status,
      data,
    );
  }

  return data as T;
}

/**
 * Helper functions for common HTTP methods
 */
export const api = {
  get: <T>(endpoint: string, options?: Omit<ApiClientOptions, "method">) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<ApiClientOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "POST", body }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<ApiClientOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "PUT", body }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<ApiClientOptions, "method" | "body">,
  ) => apiClient<T>(endpoint, { ...options, method: "PATCH", body }),

  delete: <T>(endpoint: string, options?: Omit<ApiClientOptions, "method">) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
