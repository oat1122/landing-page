"use client";

import { useState, useCallback } from "react";

export interface UseCopyToClipboardReturn {
  copiedId: string | null;
  handleCopy: (text: string, id: string) => Promise<void>;
  isCopied: (id: string) => boolean;
}

export function useCopyToClipboard(
  resetDelay: number = 2000,
): UseCopyToClipboardReturn {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = useCallback(
    async (text: string, id: string) => {
      try {
        await navigator.clipboard.writeText(text.replace(/\n/g, ", "));
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), resetDelay);
      } catch {
        console.error("Failed to copy");
      }
    },
    [resetDelay],
  );

  const isCopied = useCallback((id: string) => copiedId === id, [copiedId]);

  return { copiedId, handleCopy, isCopied };
}
