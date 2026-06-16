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
        {/* Section 1 — Headline */}
        <HeroSection />
        {/* Section 2 — Instant Preview Tool */}
        <PreviewTool />
        {/* Section 3 — One design, many products */}
        <ProductLineSection />
        {/* Section 4 — How it works */}
        <HowItWorksSection />
        {/* Section 5 — How WRKTD is different */}
        <DifferentiatorSection />
        {/* Section 6 — Pricing */}
        <PricingSection />
        {/* Section 7 — Proof / testimonials */}
        <TestimonialsSection />
        {/* Section 8 — FAQ */}
        <FAQSection />
        {/* Section 9 — Final CTA (repeat of upload tool) */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
