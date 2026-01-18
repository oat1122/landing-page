"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxItem {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  showCounter?: boolean;
  showInfo?: boolean;
}

export default function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  showCounter = true,
  showInfo = true,
}: LightboxProps) {
  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation - Previous */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>
      )}

      {/* Navigation - Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 text-white/80 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <ChevronRight className="w-10 h-10" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-4xl max-h-[80vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentItem.src}
          alt={currentItem.alt}
          width={1200}
          height={800}
          className="object-contain w-full h-full rounded-lg"
        />

        {/* Info Overlay */}
        {showInfo && (currentItem.title || currentItem.description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
            {currentItem.title && (
              <h3 className="text-white text-xl font-bold">
                {currentItem.title}
              </h3>
            )}
            {currentItem.description && (
              <p className="text-white/80 mt-1">{currentItem.description}</p>
            )}
          </div>
        )}
      </div>

      {/* Image Counter */}
      {showCounter && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
          {currentIndex + 1} / {items.length}
        </div>
      )}
    </div>
  );
}
