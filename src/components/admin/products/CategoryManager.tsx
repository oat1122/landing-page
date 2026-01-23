"use client";

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  FolderOpen,
  GripVertical,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { useCategories, ProductCategory } from "@/hooks/admin/useCategories";
import Modal from "@/components/shared/Modal";

interface CategoryManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryManager({
  isOpen,
  onClose,
}: CategoryManagerProps) {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch,
  } = useCategories();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setFormError("");
    setIsCreating(false);
    setEditingId(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("กรุณากรอกชื่อหมวดหมู่");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await createCategory({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
      });
      resetForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !formData.name.trim()) {
      setFormError("กรุณากรอกชื่อหมวดหมู่");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      await updateCategory(editingId, {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
      });
      resetForm();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: ProductCategory) => {
    if (category._count.products > 0) {
      alert("ไม่สามารถลบหมวดหมู่ที่มีสินค้าอยู่ได้");
      return;
    }

    if (!confirm(`ต้องการลบหมวดหมู่ "${category.name}" หรือไม่?`)) {
      return;
    }

    try {
      await deleteCategory(category.id);
    } catch (err) {
      alert(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    }
  };

  const startEdit = (category: ProductCategory) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setIsCreating(false);
    setFormError("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="จัดการหมวดหมู่สินค้า"
      size="lg"
    >
      <div className="space-y-4">
        {/* Add New Button */}
        {!isCreating && !editingId && (
          <button
            type="button"
            onClick={() => {
              setIsCreating(true);
              setFormData({ name: "", description: "" });
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            เพิ่มหมวดหมู่ใหม่
          </button>
        )}

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <form
            onSubmit={editingId ? handleUpdate : handleCreate}
            className="p-4 bg-gray-50 rounded-lg space-y-3"
          >
            <h4 className="font-medium text-gray-900">
              {editingId ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อหมวดหมู่ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="เช่น เสื้อยืด, เสื้อโปโล"
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำอธิบาย (ไม่บังคับ)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="คำอธิบายเพิ่มเติม..."
                disabled={isSubmitting}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400 disabled:bg-gray-100"
              />
            </div>

            {formError && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {formError}
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {editingId ? "บันทึก" : "เพิ่ม"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50"
              >
                <X className="w-4 h-4" />
                ยกเลิก
              </button>
            </div>
          </form>
        )}

        {/* Categories List */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
            <button
              onClick={refetch}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              ลองอีกครั้ง
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <FolderOpen className="w-12 h-12 mb-2" />
            <p>ยังไม่มีหมวดหมู่</p>
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`
                  flex items-center justify-between p-3 bg-white border rounded-lg
                  ${editingId === category.id ? "border-blue-500" : "border-gray-200"}
                `}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">
                      {category._count.products} สินค้า
                      {category.description && ` • ${category.description}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(category)}
                    disabled={isSubmitting}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    title="แก้ไข"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(category)}
                    disabled={isSubmitting || category._count.products > 0}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    title={
                      category._count.products > 0
                        ? "ไม่สามารถลบได้เพราะมีสินค้าอยู่"
                        : "ลบ"
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Close Button */}
        <div className="pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </div>
    </Modal>
  );
}
