import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  faqSchema,
  JsonLd,
} from "@/config/seo";
import Navbar from "@/components/pc/Navbar";
import HeroSection from "@/components/pc/home/HeroSection";
import ProductsSection from "@/components/pc/home/ProductsSection";
import FabricGuideSection from "@/components/pc/home/FabricGuideSection";
import WhyChooseUs from "@/components/pc/home/WhyChooseUs";
import ProcessSection from "@/components/pc/home/ProcessSection";
import FAQSection from "@/components/pc/home/FAQSection";
import Footer from "@/components/pc/Footer";
import PromotionModal from "@/components/pc/home/PromotionModal";

export default function PcHomePage() {
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
