import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105",
    secondary:
      "bg-white text-indigo-600 shadow-md hover:shadow-lg hover:scale-105",
    outline:
      "border-2 border-gray-300 text-gray-700 hover:border-indigo-600 hover:text-indigo-600",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
