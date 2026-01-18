import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Upload, Images } from "lucide-react";
import BackButton from "@/components/shared/BackButton";
import ImageUploadForm from "@/components/admin/ImageUploadForm";
import ImageGallery from "@/components/admin/ImageGallery";

export const metadata = {
  title: "จัดการรูปภาพ | Dashboard",
  description: "อัพโหลดและจัดการรูปภาพสำหรับเว็บไซต์",
};

export default async function ImagesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <BackButton className="mb-6" label="ย้อนกลับ" />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Upload className="w-6 h-6 text-blue-600" />
              อัพโหลดรูปภาพใหม่
            </h2>
            <ImageUploadForm />
          </div>

          {/* Gallery Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Images className="w-6 h-6 text-green-600" />
              รูปภาพทั้งหมด
            </h2>
            <ImageGallery />
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-3">💡 วิธีใช้งาน</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>
              • <strong>Alt Text</strong> - จำเป็นสำหรับ SEO
              คือข้อความอธิบายรูปภาพ
            </li>
            <li>
              • <strong>Copy URL</strong> - คลิกไอคอน copy เพื่อคัดลอก URL
              รูปภาพ
            </li>
            <li>
              • <strong>Category</strong> - จัดหมวดหมู่เพื่อค้นหาได้ง่าย
            </li>
            <li>• รูปภาพจะถูกแปลงเป็น WebP อัตโนมัติเพื่อประหยัดพื้นที่</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
