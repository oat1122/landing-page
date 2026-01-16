import Link from "next/link";
import { Shirt } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 text-xl font-bold text-gray-900 ${className}`}
    >
      <Shirt className="w-8 h-8 text-indigo-600" />
      <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        โรงงานผลิตเสื้อ
      </span>
    </Link>
  );
}
