import { ReactNode } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-3",
};

export default function LoadingSpinner({
  size = "md",
  className = "",
  color = "border-blue-600",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-b-transparent ${sizes[size]} ${color} ${className}`}
    />
  );
}

interface LoadingContainerProps {
  children?: ReactNode;
  className?: string;
}

export function LoadingContainer({
  children,
  className = "py-12",
}: LoadingContainerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children || <LoadingSpinner />}
    </div>
  );
}
