"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Loader2,
  AlertCircle,
  Check,
  Image as ImageIcon,
  Settings,
  Tag,
  Search,
  Package,
  X,
} from "lucide-react";
import Modal from "@/components/shared/Modal";
import TagInput from "./TagInput";
import ImagePicker from "./ImagePicker";
import { useCategories } from "@/hooks/admin/useCategories";
import { Product, ProductTag } from "@/hooks/admin/useProducts";
import { ImageData } from "@/hooks/admin/useInfiniteImageGallery";

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export interface ProductFormData {
  name: string;
  slug?: string;
  sku?: string;
  description?: string;
  price?: number | null;
  comparePrice?: number | null;
  type: "real" | "sample";
  mainImageId?: string | null;
  categoryId?: string | null;
  tagIds?: string[];
  metaTitle?: string;
  metaDescription?: string;
  status: "draft" | "active" | "inactive";
  featured: boolean;
}

// Helper function to get initial form data from product
function getInitialFormData(product?: Product | null): ProductFormData {
  if (product) {
    return {
      name: product.name || "",
      slug: product.slug || "",
      sku: product.sku || "",
      description: product.description || "",
      price: product.price,
      comparePrice: product.comparePrice,
      type: product.type || "real",
      mainImageId: product.mainImageId,
      categoryId: product.categoryId,
      tagIds: product.tags?.map((t) => t.id) || [],
      metaTitle: product.metaTitle || "",
      metaDescription: product.metaDescription || "",
      status: product.status || "draft",
      featured: product.featured || false,
    };
  }
  return {
    name: "",
    slug: "",
    sku: "",
    description: "",
    price: null,
    comparePrice: null,
    type: "real",
    mainImageId: null,
    categoryId: null,
    tagIds: [],
    metaTitle: "",
    metaDescription: "",
    status: "draft",
    featured: false,
  };
}

export default function ProductForm({
  isOpen,
  onClose,
  product,
  onSubmit,
  isSubmitting = false,
}: ProductFormProps) {
  const { categories } = useCategories();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Create a stable key to track when form should reset
  const formResetKey = useMemo(
    () => `${isOpen}-${product?.id ?? "new"}`,
    [isOpen, product?.id],
  );

  // Form state - initialize with product data
  const [formData, setFormData] = useState<ProductFormData>(() =>
    getInitialFormData(product),
  );

  // Selected image for preview
  const [selectedImage, setSelectedImage] = useState<{
    id: string;
    url: string;
    alt: string;
  } | null>(() => product?.mainImage || null);

  // Selected tags
  const [selectedTags, setSelectedTags] = useState<ProductTag[]>(
    () => product?.tags || [],
  );

  // Track the last reset key to detect changes
  const [lastResetKey, setLastResetKey] = useState(formResetKey);

  // Reset form when modal opens with different product
  if (formResetKey !== lastResetKey) {
    setFormData(getInitialFormData(product));
    setSelectedImage(product?.mainImage || null);
    setSelectedTags(product?.tags || []);
    setError("");
    setSuccess(false);
    setActiveSection("basic");
    setLastResetKey(formResetKey);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name.trim()) {
      setError("กรุณากรอกชื่อสินค้า");
      setActiveSection("basic");
      return;
    }

    try {
      await onSubmit({
        ...formData,
        tagIds: selectedTags.map((t) => t.id),
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    }
  };

  const handleImageSelect = (image: ImageData) => {
    setSelectedImage({ id: image.id, url: image.url, alt: image.alt });
    setFormData({ ...formData, mainImageId: image.id });
  };

  const removeImage = () => {
    setSelectedImage(null);
    setFormData({ ...formData, mainImageId: null });
  };

  const sections = [
    { id: "basic", label: "ข้อมูลพื้นฐาน", icon: Package },
    { id: "image", label: "รูปภาพ", icon: ImageIcon },
    { id: "category", label: "หมวดหมู่ & Tags", icon: Tag },
    { id: "seo", label: "SEO", icon: Search },
    { id: "settings", label: "การตั้งค่า", icon: Settings },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={product ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"}
        size="xl"
        closeOnOverlay={!isSubmitting}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Section Tabs */}
          <div className="flex gap-1 border-b overflow-x-auto pb-px">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap
                  ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }
                `}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>

          {/* Section Content */}
          <div className="min-h-[300px]">
            {/* Basic Info Section */}
            {activeSection === "basic" && (
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อสินค้า <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="เช่น เสื้อยืดคอกลม Cotton 100%"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                    required
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเภทสินค้า
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="real"
                        checked={formData.type === "real"}
                        onChange={() =>
                          setFormData({ ...formData, type: "real" })
                        }
                        disabled={isSubmitting}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">สินค้าจริง</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        value="sample"
                        checked={formData.type === "sample"}
                        onChange={() =>
                          setFormData({ ...formData, type: "sample" })
                        }
                        disabled={isSubmitting}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">สินค้าตัวอย่าง</span>
                    </label>
                  </div>
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SKU (รหัสสินค้า)
                  </label>
                  <input
                    type="text"
                    value={formData.sku || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    placeholder="เช่น TSHIRT-001"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                  />
                </div>

                {/* Price & Compare Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ราคา (บาท)
                    </label>
                    <input
                      type="number"
                      value={formData.price ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ราคาเปรียบเทียบ (บาท)
                    </label>
                    <input
                      type="number"
                      value={formData.comparePrice ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          comparePrice: e.target.value
                            ? parseFloat(e.target.value)
                            : null,
                        })
                      }
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    รายละเอียดสินค้า
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="อธิบายรายละเอียดสินค้า..."
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Image Section */}
            {activeSection === "image" && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปภาพหลัก
                </label>

                {selectedImage ? (
                  <div className="relative inline-block">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={selectedImage.url}
                        alt={selectedImage.alt}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={isSubmitting}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowImagePicker(true)}
                      disabled={isSubmitting}
                      className="mt-2 w-full px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      เปลี่ยนรูป
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowImagePicker(true)}
                    disabled={isSubmitting}
                    className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">เลือกรูปภาพ</span>
                  </button>
                )}

                <p className="text-sm text-gray-500">
                  เลือกรูปภาพจากคลังรูปภาพที่อัพโหลดไว้แล้ว
                </p>
              </div>
            )}

            {/* Category & Tags Section */}
            {activeSection === "category" && (
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    หมวดหมู่
                  </label>
                  <select
                    value={formData.categoryId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryId: e.target.value || null,
                      })
                    }
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 disabled:bg-gray-50"
                  >
                    <option value="">-- ไม่ระบุหมวดหมู่ --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <TagInput
                    selectedTags={selectedTags}
                    onChange={setSelectedTags}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    พิมพ์ชื่อ tag แล้วกด Enter เพื่อเพิ่ม
                  </p>
                </div>
              </div>
            )}

            {/* SEO Section */}
            {activeSection === "seo" && (
              <div className="space-y-4">
                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="auto-generated-from-name"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    ปล่อยว่างเพื่อสร้างจากชื่อสินค้าอัตโนมัติ
                  </p>
                </div>

                {/* Meta Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, metaTitle: e.target.value })
                    }
                    placeholder="ชื่อที่แสดงใน Search Engine"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.metaDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription: e.target.value,
                      })
                    }
                    placeholder="คำอธิบายที่แสดงใน Search Engine"
                    rows={3}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
                  />
                </div>
              </div>
            )}

            {/* Settings Section */}
            {activeSection === "settings" && (
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานะ
                  </label>
                  <div className="flex gap-4">
                    {[
                      {
                        value: "draft",
                        label: "ร่าง",
                        color: "bg-gray-100 text-gray-700",
                      },
                      {
                        value: "active",
                        label: "เปิดใช้งาน",
                        color: "bg-green-100 text-green-700",
                      },
                      {
                        value: "inactive",
                        label: "ปิดใช้งาน",
                        color: "bg-red-100 text-red-700",
                      },
                    ].map((status) => (
                      <label
                        key={status.value}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer border-2 transition-all
                          ${
                            formData.status === status.value
                              ? `${status.color} border-current`
                              : "border-gray-200 hover:border-gray-300"
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={status.value}
                          checked={formData.status === status.value}
                          onChange={() =>
                            setFormData({
                              ...formData,
                              status: status.value as
                                | "draft"
                                | "active"
                                | "inactive",
                            })
                          }
                          disabled={isSubmitting}
                          className="sr-only"
                        />
                        <span>{status.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Featured */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      disabled={isSubmitting}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div>
                      <span className="font-medium text-gray-900">
                        สินค้าแนะนำ
                      </span>
                      <p className="text-sm text-gray-500">
                        แสดงในส่วนสินค้าแนะนำของเว็บไซต์
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <Check className="w-5 h-5" />
              <span className="text-sm">บันทึกสำเร็จ!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name.trim()}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  {product ? "บันทึกการเปลี่ยนแปลง" : "สร้างสินค้า"}
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Image Picker Modal */}
      <ImagePicker
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onSelect={handleImageSelect}
        selectedImageId={selectedImage?.id}
      />
    </>
  );
}
