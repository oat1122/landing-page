import { ReactNode } from "react";
import { Image as ImageIcon, FileQuestion, Search, Inbox } from "lucide-react";

type EmptyStateVariant = "default" | "image" | "search" | "inbox";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  variant?: EmptyStateVariant;
  action?: ReactNode;
  className?: string;
}

const variantIcons: Record<EmptyStateVariant, ReactNode> = {
  default: <FileQuestion className="w-12 h-12" />,
  image: <ImageIcon className="w-12 h-12" />,
  search: <Search className="w-12 h-12" />,
  inbox: <Inbox className="w-12 h-12" />,
};

export default function EmptyState({
  title = "ไม่พบข้อมูล",
  description,
  icon,
  variant = "default",
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 text-gray-500 ${className}`}>
      <div className="mx-auto mb-4 opacity-50">
        {icon || variantIcons[variant]}
      </div>
      <p className="font-medium text-gray-700">{title}</p>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
