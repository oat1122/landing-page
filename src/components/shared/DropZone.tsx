"use client";

import { ReactNode, useCallback } from "react";
import { Image as ImageIcon } from "lucide-react";

interface DropZoneProps {
  onDrop: (files: FileList) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  isDragging?: boolean;
  hasFiles?: boolean;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  title?: string;
  description?: string;
}

export default function DropZone({
  onDrop,
  onDragOver,
  onDragLeave,
  isDragging = false,
  hasFiles = false,
  accept = "image/*",
  multiple = true,
  children,
  className = "",
  disabled = false,
  inputRef,
  title = "ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์",
  description,
}: DropZoneProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      onDrop(e.dataTransfer.files);
    },
    [onDrop, disabled],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      onDragOver?.(e);
    },
    [onDragOver, disabled],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      onDragLeave?.(e);
    },
    [onDragLeave],
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    inputRef?.current?.click();
  }, [inputRef, disabled]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        }
        ${hasFiles ? "border-green-500 bg-green-50" : ""}
        ${className}
      `}
    >
      {inputRef && (
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          disabled={disabled}
        />
      )}

      {children || (
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="p-4 bg-gray-200 rounded-full">
              <ImageIcon className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div>
            <p className="text-gray-700 font-medium">{title}</p>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
