import { Metadata } from "next";
import {
  homeMetadata,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  faqSchema,
  JsonLd,
} from "@/config/seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import PromotionModal from "@/components/PromotionModal";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Promotion Modal */}
      <PromotionModal />

      {/* Main Layout */}
      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <ProductsSection />
          <WhyChooseUs />
          <ProcessSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
