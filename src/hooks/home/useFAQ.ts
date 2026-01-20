"use client";

import { useState, useCallback } from "react";

export interface UseFAQReturn {
  openIndex: number | null;
  toggleFAQ: (index: number) => void;
  isOpen: (index: number) => boolean;
}

export function useFAQ(initialOpen: number | null = 0): UseFAQReturn {
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const isOpen = useCallback(
    (index: number) => openIndex === index,
    [openIndex]
  );

  return { openIndex, toggleFAQ, isOpen };
}
