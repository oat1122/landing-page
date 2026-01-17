import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import DashboardContent from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "แดชบอร์ด | โรงงานผลิตเสื้อ",
  description: "จัดการข้อมูลและระบบต่างๆ ของโรงงานผลิตเสื้อ",
};

export default async function DashboardPage() {
  const session = await auth();

  return <DashboardContent user={session?.user} />;
}
