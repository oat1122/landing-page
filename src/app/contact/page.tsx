import { headers } from "next/headers";
import { Metadata } from "next";
import { contactMetadata } from "@/config/seo";
import MobileContactPage from "@/components/mobile/MobileContactPage";
import Pccontact from "@/components/pc/Pccontact";

export const metadata: Metadata = contactMetadata;

export default async function ContactPage() {
  const headersList = await headers();
  const viewport = headersList.get("x-viewport");

  // For now, only mobile version is implemented
  // TODO: Create PcContactPage when needed
  if (viewport === "mobile") {
    return <MobileContactPage />;
  }

  // Return mobile version as fallback for now
  return <Pccontact />;
}
