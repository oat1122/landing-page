import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AboutHeroSection from "./about/AboutHeroSection";
import StorySection from "./about/StorySection";
import MissionVisionSection from "./about/MissionVisionSection";

import CTASection from "./about/CTASection";

const MobileAboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-0">
        <AboutHeroSection />
        <StorySection />
        <MissionVisionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default MobileAboutPage;
