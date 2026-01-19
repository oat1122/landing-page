"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Calendar,
  Tag,
  X,
  Edit,
  LayoutGrid,
  List,
  Folder,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import {
  useInfiniteImageGallery,
  ImageData,
} from "@/hooks/useInfiniteImageGallery";
import { LoadingContainer } from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import EditImageModal from "@/components/admin/EditImageModal";
import Modal from "@/components/shared/Modal";
import ImageUploadForm from "@/components/admin/ImageUploadForm";

interface ImageGalleryProps {
  onSelect?: (image: ImageData) => void;
  selectable?: boolean;
  refreshKey?: number;
}

export default function ImageGallery({
  onSelect,
  selectable = false,
  refreshKey = 0,
}: ImageGalleryProps) {
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadRefreshKey, setUploadRefreshKey] = useState(0);

  const {
    filteredImages,
    allTags,
    loading,
    error,
    copiedId,
    selectedId,
    filter,
    viewMode,
    searchName,
    searchTag,
    searchDateFrom,
    searchDateTo,
    showFilters,
    hasActiveFilters,
    totalCount,
    setFilter,
    setViewMode,
    setSearchName,
    setSearchTag,
    setSearchDateFrom,
    setSearchDateTo,
    setShowFilters,
    clearFilters,
    copyUrl,
    deleteImage,
    handleSelect,
    refetch,
    formatSize,
    formatDate,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteImageGallery({
    onSelect,
    selectable,
    refreshKey: refreshKey + uploadRefreshKey,
  });

  // Intersection observer for infinite scroll
  const { ref: observerRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // Trigger fetchNextPage when observer is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleEdit = (image: ImageData) => {
    setEditingImage(image);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    refetch();
    setShowEditModal(false);
    setEditingImage(null);
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
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          รูปภาพทั้งหมด ({totalCount})
        </h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          อัพโหลดรูปภาพ
        </button>
      </div>

      {/* Search Section */}
      <div className="space-y-3">
        {/* Quick Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="ค้นหาจากชื่อรูป..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Toggle Advanced Filters */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          {showFilters ? "ซ่อนตัวกรองเพิ่มเติม" : "ตัวกรองเพิ่มเติม"}
        </button>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg">
            {/* Tag Search with Dropdown */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                <Tag className="w-3 h-3" /> ค้นหาจาก Tag
              </label>
              <input
                type="text"
                list="tag-options"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                placeholder="เลือกหรือพิมพ์ tag..."
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
              />
              <datalist id="tag-options">
                {allTags.map((tag) => (
                  <option key={tag} value={tag} />
                ))}
              </datalist>
            </div>

            {/* Date From */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                <Calendar className="w-3 h-3" /> วันที่เริ่มต้น
              </label>
              <input
                type="date"
                value={searchDateFrom}
                onChange={(e) => setSearchDateFrom(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-600 mb-1">
                <Calendar className="w-3 h-3" /> วันที่สิ้นสุด
              </label>
              <input
                type="date"
                value={searchDateTo}
                onChange={(e) => setSearchDateTo(e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <X className="w-3 h-3" /> ล้างตัวกรอง
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {["", "product", "blog", "banner", "gallery", "other"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${
                  filter === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {cat === ""
                ? "ทั้งหมด"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
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

      {/* Results Count */}
      {hasActiveFilters && (
        <p className="text-sm text-gray-500">
          พบ {filteredImages.length} รูป จากทั้งหมด {totalCount} รูป
        </p>
      )}

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <EmptyState
          variant="image"
          title={hasActiveFilters ? "ไม่พบรูปภาพที่ค้นหา" : "ยังไม่มีรูปภาพ"}
        />
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => handleSelect(image)}
              className={`
                group relative bg-white rounded-xl overflow-hidden shadow-sm border
                transition-all duration-200 hover:shadow-md
                ${selectable ? "cursor-pointer" : ""}
                ${selectedId === image.id ? "ring-2 ring-blue-500" : ""}
              `}
            >
              <div className="aspect-square bg-gray-100 relative">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />

                {/* Overlay Actions - Top Right Corner */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(image.url, image.id);
                      }}
                      className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md hover:bg-white shadow-sm cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedId === image.id ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-700" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(image);
                      }}
                      className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md hover:bg-blue-50 shadow-sm cursor-pointer"
                      title="แก้ไข"
                    >
                      <Edit className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md hover:bg-white shadow-sm"
                      title="เปิดในแท็บใหม่"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gray-700" />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage(image.id);
                      }}
                      className="p-1.5 bg-white/90 backdrop-blur-sm rounded-md hover:bg-red-50 shadow-sm cursor-pointer"
                      title="ลบ"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-2.5">
                <p
                  className="text-sm font-medium text-gray-800 truncate mb-1.5"
                  title={image.alt}
                >
                  {image.alt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span className="truncate">{formatSize(image.size)}</span>
                  <span className="ml-2 shrink-0">
                    {formatDate(image.createdAt)}
                  </span>
                </div>
                {image.tags && (
                  <div className="flex flex-wrap gap-1">
                    {image.tags
                      .split(",")
                      .slice(0, 2)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded truncate max-w-16"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    {image.tags.split(",").length > 2 && (
                      <span className="px-1.5 py-0.5 text-gray-400 text-xs shrink-0">
                        +{image.tags.split(",").length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={`
                flex gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow
                ${selectable ? "cursor-pointer" : ""}
                ${selectedId === image.id ? "ring-2 ring-blue-500" : ""}
              `}
              onClick={() => selectable && handleSelect(image)}
            >
              {/* Thumbnail */}
              <div className="shrink-0 w-24 h-24 relative bg-gray-100 rounded overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                  unoptimized
                />
              </div>

              {/* Info Section */}
              <div className="flex-1 min-w-0">
                {/* Title Row */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate text-base">
                      {image.alt}
                    </h3>
                    {image.title && (
                      <p className="text-sm text-gray-600 truncate mt-0.5">
                        {image.title}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyUrl(image.url, image.id);
                      }}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedId === image.id ? (
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-700" />
                      )}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(image);
                      }}
                      className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-md cursor-pointer"
                      title="แก้ไข"
                    >
                      <Edit className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-md"
                      title="เปิดในแท็บใหม่"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gray-700" />
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage(image.id);
                      }}
                      className="p-1.5 bg-red-50 hover:bg-red-100 rounded-md cursor-pointer"
                      title="ลบ"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-2">
                  {image.category && (
                    <span className="flex items-center gap-1">
                      <Folder className="w-3.5 h-3.5" />
                      {image.category.charAt(0).toUpperCase() +
                        image.category.slice(1)}
                    </span>
                  )}
                  <span>{formatSize(image.size)}</span>
                  <span>{formatDate(image.createdAt)}</span>
                  {image.width && image.height && (
                    <span className="text-gray-500">
                      {image.width} × {image.height}px
                    </span>
                  )}
                </div>

                {/* Tags */}
                {image.tags && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {image.tags.split(",").map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Caption */}
                {image.caption && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {image.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Infinite Scroll Observer & Indicators */}
      {filteredImages.length > 0 && (
        <div
          ref={observerRef}
          className="h-16 flex items-center justify-center"
        >
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-sm">กำลังโหลดเพิ่ม...</span>
            </div>
          )}
          {!hasNextPage && !isFetchingNextPage && (
            <span className="text-sm text-gray-400">ไม่มีรูปภาพเพิ่มเติม</span>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <EditImageModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingImage(null);
        }}
        image={editingImage}
        onSuccess={handleEditSuccess}
      />

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="อัพโหลดรูปภาพ"
        size="xl"
      >
        <ImageUploadForm
          onUploadSuccess={() => {
            setUploadRefreshKey((prev) => prev + 1);
            setShowUploadModal(false);
          }}
          onUploadError={(error) => {
            console.error("Upload error:", error);
          }}
        />
      </Modal>
    </div>
  );
}
