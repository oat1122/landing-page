"use client";

import {
  Upload,
  X,
  ImageIcon,
  Loader2,
  Check,
  AlertCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Tag as TagIcon,
} from "lucide-react";
import { useFileUpload, UploadedImage } from "@/hooks/admin/useFileUpload";

interface ImageUploadFormProps {
  onUploadSuccess?: (images: UploadedImage[]) => void;
  onUploadError?: (error: string) => void;
}

export default function ImageUploadForm({
  onUploadSuccess,
  onUploadError,
}: ImageUploadFormProps) {
  const {
    files,
    isUploading,
    uploadStatus,
    errorMessage,
    isDragging,
    sharedCaption,
    sharedCategory,
    sharedTags,
    tagInput,
    existingTags,
    successCount,
    pendingCount,
    fileInputRef,
    setSharedCaption,
    setSharedCategory,
    setSharedTags,
    setTagInput,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleInputChange,
    removeFile,
    updateFileAlt,
    updateFileTitle,
    toggleExpanded,
    clearAllFiles,
    handleSubmit,
  } = useFileUpload({ onUploadSuccess, onUploadError });

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400 bg-gray-50"
            }
            ${files.length > 0 ? "border-green-500 bg-green-50" : ""}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="space-y-3">
            <div className="flex justify-center">
              <div className="p-4 bg-gray-200 rounded-full">
                <ImageIcon className="w-8 h-8 text-gray-500" />
              </div>
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์
              </p>
              <p className="text-sm text-gray-500 mt-1">
                รองรับ JPG, PNG, GIF, WebP, SVG (ไม่เกิน 5MB) - เลือกได้หลายไฟล์
              </p>
            </div>
          </div>
        </div>

        {/* Selected Files Preview */}
        {files.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                รูปที่เลือก ({files.length} รูป)
              </h3>
              <button
                type="button"
                onClick={clearAllFiles}
                className="text-sm text-red-600 hover:text-red-700"
              >
                ล้างทั้งหมด
              </button>
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {files.map((fileData, index) => (
                <div key={index} className="relative group">
                  <div
                    className={`
                      aspect-square rounded-lg overflow-hidden border-2
                      ${fileData.status === "success" ? "border-green-500" : ""}
                      ${fileData.status === "error" ? "border-red-500" : ""}
                      ${fileData.status === "uploading" ? "border-blue-500" : ""}
                      ${fileData.status === "pending" ? "border-gray-200" : ""}
                    `}
                  >
                    {fileData.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={fileData.preview}
                        alt={fileData.alt || "Preview"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      </div>
                    )}

                    {/* Status overlay */}
                    {fileData.status === "uploading" && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                      </div>
                    )}
                    {fileData.status === "success" && (
                      <div className="absolute inset-0 bg-green-500/50 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {fileData.status === "error" && (
                      <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Remove button */}
                  {fileData.status === "pending" && (
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Alt Text for each file */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">
                Alt Text สำหรับแต่ละรูป <span className="text-red-500">*</span>
              </h4>
              {files.map((fileData, index) => (
                <div
                  key={index}
                  className={`
                    border rounded-lg overflow-hidden
                    ${fileData.status === "success" ? "border-green-300 bg-green-50" : "border-gray-200"}
                    ${fileData.status === "error" ? "border-red-300 bg-red-50" : ""}
                  `}
                >
                  <div className="flex items-center gap-2 p-2">
                    <span className="text-xs text-gray-500 w-12 flex-shrink-0">
                      รูป {index + 1}:
                    </span>
                    <input
                      type="text"
                      value={fileData.alt}
                      onChange={(e) => updateFileAlt(index, e.target.value)}
                      placeholder="อธิบายรูปภาพ..."
                      disabled={fileData.status !== "pending"}
                      className="flex-1 px-2 py-1 text-sm border-0 bg-transparent focus:ring-0 text-gray-900 placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => toggleExpanded(index)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      disabled={fileData.status !== "pending"}
                    >
                      {fileData.expanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Expanded: Title input */}
                  {fileData.expanded && fileData.status === "pending" && (
                    <div className="px-2 pb-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-xs text-gray-500 w-12 flex-shrink-0">
                          Title:
                        </span>
                        <input
                          type="text"
                          value={fileData.title}
                          onChange={(e) =>
                            updateFileTitle(index, e.target.value)
                          }
                          placeholder="ข้อความเมื่อ hover (ไม่บังคับ)"
                          className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded bg-white focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Error message */}
                  {fileData.error && (
                    <div className="px-2 pb-2 text-xs text-red-600">
                      {fileData.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="whitespace-pre-line">{errorMessage}</span>
          </div>
        )}

        {/* Success Message */}
        {uploadStatus === "success" && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <Check className="w-5 h-5" />
            <span>อัพโหลดสำเร็จ {successCount} รูป!</span>
          </div>
        )}

        {/* Shared SEO Fields */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Search className="w-5 h-5" />
            SEO & Metadata (ใช้ร่วมกันทุกรูป)
          </h3>

          {/* Caption - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caption (ไม่บังคับ)
            </label>
            <textarea
              value={sharedCaption}
              onChange={(e) => setSharedCaption(e.target.value)}
              placeholder="คำอธิบายรูปภาพเพิ่มเติม"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={sharedCategory}
              onChange={(e) => setSharedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              <option value="product">Product</option>
              <option value="blog">Blog</option>
              <option value="banner">Banner</option>
              <option value="gallery">Gallery</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>

            {/* Tag boxes */}
            {sharedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {sharedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        setSharedTags(sharedTags.filter((_, i) => i !== index));
                      }}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Input with Custom Dropdown */}
            <div className="relative">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => {
                  const value = e.target.value;
                  // Check if comma is typed
                  if (value.includes(",")) {
                    const newTag = value.replace(",", "").trim();
                    if (newTag && !sharedTags.includes(newTag)) {
                      setSharedTags([...sharedTags, newTag]);
                    }
                    setTagInput("");
                  } else {
                    setTagInput(value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const newTag = tagInput.trim();
                    if (newTag && !sharedTags.includes(newTag)) {
                      setSharedTags([...sharedTags, newTag]);
                    }
                    setTagInput("");
                  }
                  // Backspace to remove last tag when input is empty
                  if (
                    e.key === "Backspace" &&
                    tagInput === "" &&
                    sharedTags.length > 0
                  ) {
                    setSharedTags(sharedTags.slice(0, -1));
                  }
                }}
                placeholder="พิมพ์แล้วกด Enter เพื่อเพิ่ม tag"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
              />

              {/* Custom Dropdown */}
              {tagInput.length > 0 &&
                existingTags.filter(
                  (tag) =>
                    !sharedTags.includes(tag) &&
                    tag.toLowerCase().includes(tagInput.toLowerCase()),
                ).length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {existingTags
                      .filter(
                        (tag) =>
                          !sharedTags.includes(tag) &&
                          tag.toLowerCase().includes(tagInput.toLowerCase()),
                      )
                      .map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (!sharedTags.includes(tag)) {
                              setSharedTags([...sharedTags, tag]);
                            }
                            setTagInput("");
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <TagIcon className="w-3 h-3 text-gray-400" />
                            {tag}
                          </span>
                        </button>
                      ))}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={files.length === 0 || pendingCount === 0 || isUploading}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-white
            flex items-center justify-center gap-2
            transition-all duration-200
            ${
              files.length === 0 || pendingCount === 0 || isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              กำลังอัพโหลด...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              อัพโหลด {files.length > 0 ? `${pendingCount} รูปภาพ` : "รูปภาพ"}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
