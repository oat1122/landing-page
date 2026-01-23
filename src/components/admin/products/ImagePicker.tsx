"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Search, Check, Image as ImageIcon } from "lucide-react";
import Modal from "@/components/shared/Modal";
import {
  useInfiniteImageGallery,
  ImageData,
} from "@/hooks/admin/useInfiniteImageGallery";

interface ImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (image: ImageData) => void;
  selectedImageId?: string | null;
}

export default function ImagePicker({
  isOpen,
  onClose,
  onSelect,
  selectedImageId,
}: ImagePickerProps) {
  const [searchName, setSearchName] = useState("");

  const {
    filteredImages,
    loading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteImageGallery({
    selectable: true,
  });

  // Filter by search locally
  const displayedImages = searchName
    ? filteredImages.filter(
        (img) =>
          img.alt.toLowerCase().includes(searchName.toLowerCase()) ||
          img.filename.toLowerCase().includes(searchName.toLowerCase()),
      )
    : filteredImages;

  const handleSelect = (image: ImageData) => {
    onSelect(image);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="เลือกรูปภาพ" size="xl">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="ค้นหารูปภาพ..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
          {searchName && (
            <button
              type="button"
              onClick={() => setSearchName("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : displayedImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <ImageIcon className="w-12 h-12 mb-2" />
            <p>ไม่พบรูปภาพ</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {displayedImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => handleSelect(image)}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer
                    ${
                      selectedImageId === image.id
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                    unoptimized
                  />
                  {selectedImageId === image.id && (
                    <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                      <div className="bg-blue-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Load More */}
            {hasNextPage && (
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
                >
                  {isFetchingNextPage ? "กำลังโหลด..." : "โหลดเพิ่ม"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 border-t">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </Modal>
  );
}
