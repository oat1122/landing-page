"use client";

import { useState, useEffect } from "react";
import { X, Tag as TagIcon } from "lucide-react";
import { useProductTags, ProductTag } from "@/hooks/admin/useProductTags";

interface TagInputProps {
  selectedTags: ProductTag[];
  onChange: (tags: ProductTag[]) => void;
  disabled?: boolean;
}

export default function TagInput({
  selectedTags,
  onChange,
  disabled = false,
}: TagInputProps) {
  const { tags: allTags, getOrCreateTag } = useProductTags();
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Filter tags for dropdown
  const filteredTags = allTags.filter(
    (tag) =>
      !selectedTags.some((st) => st.id === tag.id) &&
      tag.name.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleAddTag = async (tag: ProductTag) => {
    if (!selectedTags.some((st) => st.id === tag.id)) {
      onChange([...selectedTags, tag]);
    }
    setInputValue("");
    setShowDropdown(false);
  };

  const handleCreateAndAddTag = async () => {
    if (!inputValue.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const newTag = await getOrCreateTag(inputValue.trim());
      if (newTag && !selectedTags.some((st) => st.id === newTag.id)) {
        onChange([...selectedTags, newTag]);
      }
      setInputValue("");
      setShowDropdown(false);
    } catch (error) {
      console.error("Error creating tag:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    onChange(selectedTags.filter((t) => t.id !== tagId));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTags.length > 0) {
        handleAddTag(filteredTags[0]);
      } else if (inputValue.trim()) {
        handleCreateAndAddTag();
      }
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      selectedTags.length > 0
    ) {
      handleRemoveTag(selectedTags[selectedTags.length - 1].id);
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className="space-y-2">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                disabled={disabled}
                className="text-blue-600 hover:text-blue-800 cursor-pointer disabled:opacity-50"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tag Input with Dropdown */}
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="พิมพ์แล้วกด Enter เพื่อเพิ่ม tag"
          disabled={disabled || isCreating}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400 disabled:bg-gray-50"
        />

        {/* Dropdown */}
        {showDropdown && inputValue.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleAddTag(tag)}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <TagIcon className="w-3 h-3 text-gray-400" />
                    {tag.name}
                  </span>
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={handleCreateAndAddTag}
                disabled={isCreating}
                className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <TagIcon className="w-3 h-3" />
                  สร้าง tag &quot;{inputValue}&quot;
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
