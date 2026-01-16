import { headers } from "next/headers";
import { Metadata } from "next";
import PcAboutPage from "@/components/pc/about/PcAboutPage";
import MobileAboutPage from "@/components/mobile/about/MobileAboutPage";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | TNP T-Shirt Factory",
  description:
    "โรงงานผลิตเสื้อยืดครบวงจร รับทำเสื้อทีม เสื้อกิจกรรม เสื้อยูนิฟอร์ม",
};

export default async function AboutPage() {
  const headersList = await headers();
  const viewport = headersList.get("x-viewport");

  // ถ้าเป็น Mobile ให้ Render หน้า Mobile
  if (viewport === "mobile") {
    return <MobileAboutPage />;
  }

  // ถ้าไม่ใช่ (เป็น Desktop) ให้ Render หน้า PC
  return <PcAboutPage />;
}
