"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  LayoutGrid,
  List,
  Filter,
  X,
  Package,
  Tag,
  Star,
  FolderOpen,
} from "lucide-react";
import { useProducts, Product } from "@/hooks/admin/useProducts";
import { useCategories } from "@/hooks/admin/useCategories";
import { LoadingContainer } from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import ProductForm, { ProductFormData } from "./ProductForm";
import CategoryManager from "./CategoryManager";

export default function ProductGallery() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const {
    filteredProducts,
    loading,
    error,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    pagination,
    setPage,
    refetch,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const { categories } = useCategories();

  const handleCreateProduct = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      await createProduct(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;
    setIsSubmitting(true);
    try {
      await updateProduct(editingProduct.id, data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`ต้องการลบสินค้า "${product.name}" หรือไม่?`)) return;

    try {
      await deleteProduct(product.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const closeForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "-";
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: "bg-gray-100 text-gray-700",
      active: "bg-green-100 text-green-700",
      inactive: "bg-red-100 text-red-700",
    };
    const labels: Record<string, string> = {
      draft: "ร่าง",
      active: "เปิดใช้งาน",
      inactive: "ปิดใช้งาน",
    };
    return (
      <span className={`px-2 py-0.5 text-xs rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return type === "sample" ? (
      <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">
        ตัวอย่าง
      </span>
    ) : null;
  };

  if (loading) {
    return <LoadingContainer />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>{error}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          ลองอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          สินค้าทั้งหมด ({pagination.total})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCategoryManager(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <FolderOpen className="w-5 h-5" />
            จัดการหมวดหมู่
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            เพิ่มสินค้า
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        {/* Quick Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาสินค้า..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors cursor-pointer
              ${showFilters ? "bg-blue-50 border-blue-300 text-blue-600" : "bg-white border-gray-300 text-gray-700"}
            `}
          >
            <Filter className="w-4 h-4" />
            ตัวกรอง
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-lg">
            {/* Type Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                ประเภท
              </label>
              <select
                value={filters.type || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    type: e.target.value as "real" | "sample" | "",
                  })
                }
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                <option value="">ทั้งหมด</option>
                <option value="real">สินค้าจริง</option>
                <option value="sample">สินค้าตัวอย่าง</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                หมวดหมู่
              </label>
              <select
                value={filters.categoryId || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    categoryId: e.target.value || undefined,
                  })
                }
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                <option value="">ทั้งหมด</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                สถานะ
              </label>
              <select
                value={filters.status || ""}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    status: e.target.value as
                      | "draft"
                      | "active"
                      | "inactive"
                      | "",
                  })
                }
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                <option value="">ทั้งหมด</option>
                <option value="draft">ร่าง</option>
                <option value="active">เปิดใช้งาน</option>
                <option value="inactive">ปิดใช้งาน</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => setFilters({})}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 cursor-pointer"
              >
                <X className="w-3 h-3" />
                ล้างตัวกรอง
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-end">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`
              p-2 rounded-md transition-colors cursor-pointer
              ${viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}
            `}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`
              p-2 rounded-md transition-colors cursor-pointer
              ${viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}
            `}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <EmptyState variant="product" title="ยังไม่มีสินค้า" />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-all"
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 relative">
                {product.mainImage ? (
                  <Image
                    src={product.mainImage.url}
                    alt={product.mainImage.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-300" />
                  </div>
                )}

                {/* Featured Star */}
                {product.featured && (
                  <div className="absolute top-2 left-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1.5 bg-white/90 rounded-md hover:bg-blue-50 cursor-pointer"
                      title="แก้ไข"
                    >
                      <Edit className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="p-1.5 bg-white/90 rounded-md hover:bg-red-50 cursor-pointer"
                      title="ลบ"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {getStatusBadge(product.status)}
                  {getTypeBadge(product.type)}
                </div>
                <p className="text-sm font-semibold text-blue-600">
                  {formatPrice(product.price)}
                </p>
                {product.category && (
                  <p className="text-xs text-gray-500 mt-1">
                    {product.category.name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="shrink-0 w-20 h-20 relative bg-gray-100 rounded overflow-hidden">
                {product.mainImage ? (
                  <Image
                    src={product.mainImage.url}
                    alt={product.mainImage.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">
                        {product.name}
                      </h3>
                      {product.featured && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      {getStatusBadge(product.status)}
                      {getTypeBadge(product.type)}
                      {product.sku && (
                        <span className="text-gray-400">
                          SKU: {product.sku}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-1.5 hover:bg-blue-50 rounded-md cursor-pointer"
                      title="แก้ไข"
                    >
                      <Edit className="w-4 h-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className="p-1.5 hover:bg-red-50 rounded-md cursor-pointer"
                      title="ลบ"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold text-blue-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.category && (
                    <span className="text-gray-500">
                      {product.category.name}
                    </span>
                  )}
                  {product.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-500">
                        {product.tags.map((t) => t.name).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            ก่อนหน้า
          </button>
          <span className="text-sm text-gray-600">
            หน้า {pagination.page} จาก {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(pagination.page + 1)}
            disabled={!pagination.hasNext}
            className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            ถัดไป
          </button>
        </div>
      )}

      {/* Product Form Modal */}
      <ProductForm
        isOpen={showProductForm}
        onClose={closeForm}
        product={editingProduct}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        isSubmitting={isSubmitting}
      />

      {/* Category Manager Modal */}
      <CategoryManager
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
      />
    </div>
  );
}
