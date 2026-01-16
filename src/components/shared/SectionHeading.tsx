import { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string | ReactNode;
  title: string | ReactNode;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mb-12 ${alignClass[align]} ${className}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
