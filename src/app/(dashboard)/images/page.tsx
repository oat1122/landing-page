import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BackButton from "@/components/shared/BackButton";
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
      <div className="w-full p-6">
        <BackButton className="mb-6" label="ย้อนกลับ" />

        {/* Image Gallery - Fullscreen */}
        <ImageGallery />
      </div>
    </div>
  );
}
