"use client";

import { useState, useMemo, useCallback } from "react";

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

export function usePortfolio(items: PortfolioItem[]) {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredItems = useMemo(() => {
    return activeCategory === "ทั้งหมด"
      ? items
      : items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImageIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : prev - 1
      );
    },
    [filteredItems.length]
  );

  const goToNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurrentImageIndex((prev) =>
        prev === filteredItems.length - 1 ? 0 : prev + 1
      );
    },
    [filteredItems.length]
  );

  return {
    activeCategory,
    setActiveCategory,
    filteredItems,
    lightboxOpen,
    currentImageIndex,
    openLightbox,
    closeLightbox,
    goToPrevious,
    goToNext,
  };
}
