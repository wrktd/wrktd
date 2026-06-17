import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import DesignVisualizer from "./components/DesignVisualizer";
import PreviewTool from "./components/PreviewTool";
import ProductLineSection from "./components/ProductLineSection";
import HowItWorksSection from "./components/HowItWorksSection";
import DifferentiatorSection from "./components/DifferentiatorSection";
import ProfitCalculator from "./components/ProfitCalculator";
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
        {/* 1 — Headline */}
        <HeroSection />
        {/* 2 — Instant design visualizer (pick a pattern, see it on a product) */}
        <DesignVisualizer />
        {/* 3 — Upload your own design preview */}
        <PreviewTool />
        {/* 4 — One design → many products */}
        <ProductLineSection />
        {/* 5 — How it works */}
        <HowItWorksSection />
        {/* 6 — How WRKTD is different */}
        <DifferentiatorSection />
        {/* 7 — Profit calculator */}
        <ProfitCalculator />
        {/* 8 — Pricing */}
        <PricingSection />
        {/* 9 — Proof / testimonials */}
        <TestimonialsSection />
        {/* 10 — FAQ */}
        <FAQSection />
        {/* 11 — Final CTA (repeat upload) */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
