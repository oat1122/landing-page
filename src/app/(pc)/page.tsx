import { Metadata } from "next";
import {
  homeMetadata,
  organizationSchema,
  websiteSchema,
  JsonLd,
} from "@/config/seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PromotionModal from "@/components/PromotionModal";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      {/* Promotion Modal */}
      <PromotionModal />

      {/* Main Layout */}
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          {/* Additional sections can be added here */}
        </main>
        <Footer />
      </div>
    </>
  );
}
