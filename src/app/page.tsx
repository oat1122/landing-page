import { headers } from "next/headers";
import { Metadata } from "next";
import { homeMetadata } from "@/config/seo";
import PcHomePage from "@/components/pc/PcHomePage";
import MobileHomePage from "@/components/mobile/MobileHomePage";

export const metadata: Metadata = homeMetadata;

export default async function HomePage() {
  const headersList = await headers();
  const viewport = headersList.get("x-viewport");

  // Debug log
  console.log("[Page] x-viewport header:", viewport);

  // ถ้าเป็น Mobile ให้ Render หน้า Mobile
  if (viewport === "mobile") {
    return <MobileHomePage />;
  }

  // ถ้าไม่ใช่ (เป็น Desktop) ให้ Render หน้า PC
  return <PcHomePage />;
}
