import Nav from "./components/Nav";
import HeroSection from "./components/HeroSection";
import ProofStory from "./components/ProofStory";
import ProductLineSection from "./components/ProductLineSection";
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
        <HeroSection />
        <ProofStory />
        <ProductLineSection />
        <HowItWorksSection />
        <DifferentiatorSection />
        <ProfitCalculator />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
