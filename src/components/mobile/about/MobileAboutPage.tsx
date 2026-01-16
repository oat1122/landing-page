import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AboutHeroSection from "./AboutHeroSection";
import StorySection from "./StorySection";
import MissionVisionSection from "./MissionVisionSection";

import CTASection from "./CTASection";

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
