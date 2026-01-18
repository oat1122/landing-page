"use client";

import {
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Calendar,
  Tag,
  X,
} from "lucide-react";
import { useImageGallery, ImageData } from "@/hooks/useImageGallery";
import { LoadingContainer } from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";

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
  const {
    filteredImages,
    allTags,
    loading,
    error,
    copiedId,
    selectedId,
    filter,
    searchName,
    searchTag,
    searchDateFrom,
    searchDateTo,
    showFilters,
    hasActiveFilters,
    images,
    setFilter,
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
  } = useImageGallery({ onSelect, selectable, refreshKey });

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

      {/* Results Count */}
      {hasActiveFilters && (
        <p className="text-sm text-gray-500">
          พบ {filteredImages.length} รูป จากทั้งหมด {images.length} รูป
        </p>
      )}

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <EmptyState
          variant="image"
          title={hasActiveFilters ? "ไม่พบรูปภาพที่ค้นหา" : "ยังไม่มีรูปภาพ"}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              {/* Image */}
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyUrl(image.url, image.id);
                    }}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === image.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-700" />
                    )}
                  </button>
                  <a
                    href={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-700" />
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteImage(image.id);
                    }}
                    className="p-2 bg-white rounded-full hover:bg-red-50 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p
                  className="text-sm font-medium text-gray-800 truncate"
                  title={image.alt}
                >
                  {image.alt}
                </p>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                  <span>{formatSize(image.size)}</span>
                  <span>{formatDate(image.createdAt)}</span>
                </div>
                {image.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags
                      .split(",")
                      .slice(0, 2)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-xs rounded"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    {image.tags.split(",").length > 2 && (
                      <span className="px-1.5 py-0.5 text-gray-400 text-xs">
                        +{image.tags.split(",").length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
