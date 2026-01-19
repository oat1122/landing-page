import Navbar from "@/components/mobile/Navbar";
import ContactHeroSection from "./contact/ContactHeroSection";
import ContactInfoSection from "./contact/ContactInfoSection";
import ContactFormSection from "./contact/ContactFormSection";
import MapSection from "./contact/MapSection";
import Footer from "@/components/mobile/Footer";

export default function MobileContactPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <ContactHeroSection />
          <ContactInfoSection />
          <ContactFormSection />
          <MapSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
