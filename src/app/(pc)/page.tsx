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
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/Footer";
import PromotionModal from "@/components/home/PromotionModal";

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
