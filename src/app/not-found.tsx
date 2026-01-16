import Link from "next/link";
import Button from "@/components/shared/Button";
import { Construction } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 text-center font-sans">
      <div className="space-y-6 max-w-md w-full animate-fade-in-up">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center shadow-inner">
            <Construction className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            404
          </h1>
          <h2 className="text-xl font-bold text-gray-800">
            เนื้อหาในส่วนนี้กำลังสร้าง..comingsoon
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            ขออภัยในความไม่สะดวก หน้าที่คุณกำลังค้นหายังไม่พร้อมใช้งาน
          </p>
        </div>

        {/* Button */}
        <div className="pt-4 flex justify-center">
          <Button href="/" variant="primary" size="md">
            กลับไปหน้า Home
          </Button>
        </div>
      </div>
    </div>
  );
}
