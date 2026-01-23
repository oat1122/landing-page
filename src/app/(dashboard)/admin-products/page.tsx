import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BackButton from "@/components/shared/BackButton";
import ProductGallery from "@/components/admin/products/ProductGallery";

export const metadata = {
  title: "จัดการสินค้า | Dashboard",
  description: "เพิ่มและจัดการสินค้าสำหรับเว็บไซต์",
};

export default async function AdminProductsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full p-6">
        <BackButton className="mb-6" label="ย้อนกลับ" />

        {/* Product Gallery */}
        <ProductGallery />
      </div>
    </div>
  );
}
