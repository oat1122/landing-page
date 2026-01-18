"use client";

import { ReactNode } from "react";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import Modal from "./Modal";

type ConfirmDialogVariant = "danger" | "warning" | "info";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmDialogVariant;
  loading?: boolean;
}

const variantStyles: Record<
  ConfirmDialogVariant,
  {
    icon: ReactNode;
    iconBg: string;
    confirmBtn: string;
  }
> = {
  danger: {
    icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
    iconBg: "bg-red-100",
    confirmBtn: "bg-red-600 hover:bg-red-700",
  },
  warning: {
    icon: <AlertCircle className="w-6 h-6 text-yellow-600" />,
    iconBg: "bg-yellow-100",
    confirmBtn: "bg-yellow-600 hover:bg-yellow-700",
  },
  info: {
    icon: <Info className="w-6 h-6 text-blue-600" />,
    iconBg: "bg-blue-100",
    confirmBtn: "bg-blue-600 hover:bg-blue-700",
  },
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "ยืนยันการดำเนินการ",
  message = "คุณแน่ใจหรือไม่ที่จะดำเนินการนี้?",
  confirmText = "ยืนยัน",
  cancelText = "ยกเลิก",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  const styles = variantStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center">
        {/* Icon */}
        <div
          className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${styles.iconBg} mb-4`}
        >
          {styles.icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

        {/* Message */}
        <p className="text-sm text-gray-600 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${styles.confirmBtn}`}
          >
            {loading ? "กำลังดำเนินการ..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
