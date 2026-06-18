import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import ProofStory from "./components/ProofStory";
import StatStrip from "./components/StatStrip";
import ProductLineSection from "./components/ProductLineSection";
import CatalogEstimator from "./components/CatalogEstimator";
import HowItWorksSection from "./components/HowItWorksSection";
import DifferentiatorSection from "./components/DifferentiatorSection";
import ProfitCalculator from "./components/ProfitCalculator";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* 1 — Hero + instant design preview (upload visible above fold) */}
        <HeroSection />
        {/* 2 — Proof story: real result, moved directly after the preview */}
        <ProofStory />
        {/* 3 — Quiet supporting numbers */}
        <StatStrip />
        {/* 4 — One design → many products */}
        <ProductLineSection />
        {/* 5 — Catalog estimator (interactive slider) */}
        <CatalogEstimator />
        {/* 6 — How it works */}
        <HowItWorksSection />
        {/* 7 — How WRKTD is different */}
        <DifferentiatorSection />
        {/* 8 — Profit calculator */}
        <ProfitCalculator />
        {/* 9 — Pricing */}
        <PricingSection />
        {/* 10 — FAQ */}
        <FAQSection />
        {/* 11 — Final CTA (repeat upload) */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
