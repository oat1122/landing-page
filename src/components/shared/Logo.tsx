import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-60 h-36">
        <Image
          src="/logo.png"
          alt="โรงงานผลิตเสื้อ Logo"
          fill
          className="object-contain object-left"
        />
      </div>
    </Link>
  );
}
