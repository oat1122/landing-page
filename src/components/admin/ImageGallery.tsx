"use client";

import { useState, useEffect } from "react";
import {
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  ExternalLink,
} from "lucide-react";

interface ImageData {
  id: string;
  filename: string;
  url: string;
  alt: string;
  title: string | null;
  category: string | null;
  tags: string | null;
  width: number | null;
  height: number | null;
  size: number;
  createdAt: string;
}

interface ImageGalleryProps {
  onSelect?: (image: ImageData) => void;
  selectable?: boolean;
}

export default function ImageGallery({
  onSelect,
  selectable = false,
}: ImageGalleryProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetchImages();
  }, [filter]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter) params.append("category", filter);

      const response = await fetch(`/api/images?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch images");
      }

      setImages(data.images);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("ต้องการลบรูปภาพนี้หรือไม่?")) return;

    try {
      const response = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      alert(
        "ลบไม่สำเร็จ: " +
          (err instanceof Error ? err.message : "Unknown error"),
      );
    }
  };

  const handleSelect = (image: ImageData) => {
    if (selectable) {
      setSelectedId(image.id);
      onSelect?.(image);
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchImages}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ลองอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["", "product", "blog", "banner", "gallery", "other"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
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

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>ยังไม่มีรูปภาพ</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
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
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
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
                    className="p-2 bg-white rounded-full hover:bg-red-50"
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
                  {image.width && image.height && (
                    <span>
                      {image.width}×{image.height}
                    </span>
                  )}
                </div>
                {image.category && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {image.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
