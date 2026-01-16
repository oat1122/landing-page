import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  faqSchema,
  JsonLd,
} from "@/config/seo";
import Navbar from "@/components/mobile/Navbar";
import HeroSection from "@/components/mobile/home/HeroSection";
import ProductsSection from "@/components/mobile/home/ProductsSection";
import FabricGuideSection from "@/components/mobile/home/FabricGuideSection";
import WhyChooseUs from "@/components/mobile/home/WhyChooseUs";
import ProcessSection from "@/components/mobile/home/ProcessSection";
import FAQSection from "@/components/mobile/home/FAQSection";
import Footer from "@/components/mobile/Footer";
import PromotionModal from "@/components/pc/home/PromotionModal"; // Reuse for now or create mobile version later

export default function MobileHomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      {/* Promotion Modal - Reuse same logic */}
      <PromotionModal />

      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <HeroSection />
          <ProductsSection />
          <FabricGuideSection />
          <WhyChooseUs />
          <ProcessSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
