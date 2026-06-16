import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import PreviewTool from "./components/PreviewTool";
import ProductLineSection from "./components/ProductLineSection";
import HowItWorksSection from "./components/HowItWorksSection";
import DifferentiatorSection from "./components/DifferentiatorSection";
import PricingSection from "./components/PricingSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <PreviewTool />
        <ProductLineSection />
        <HowItWorksSection />
        <DifferentiatorSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
