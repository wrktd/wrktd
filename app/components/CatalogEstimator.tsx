"use client";
import { useState } from "react";

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
}

export default function CatalogEstimator() {
  const [designs, setDesigns] = useState(20);

  const products = designs * 5;
  const weeks    = Math.max(1, Math.round(designs * 0.4));

  return (
    <section id="estimator" className="glass-mid py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Estimate your catalog</span>
        </div>

        <h2
          className="font-display font-extrabold text-white leading-[0.88] mb-5"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          How many designs<br />
          <span style={{ color: "rgba(255,255,255,0.22)" }}>do you have?</span>
        </h2>

        <p className="text-base mb-14 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)", maxWidth: "28rem" }}>
          See how quickly existing artwork turns into a product catalog — and how much manual work it skips.
        </p>

        {/* Slider */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <span className="font-display font-bold text-gold" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 1 }}>
              {designs}
            </span>
            <span className="label mb-2" style={{ color: "rgba(255,255,255,0.22)" }}>designs</span>
          </div>

          <input
            type="range"
            min={1}
            max={200}
            value={designs}
            onChange={(e) => setDesigns(Number(e.target.value))}
            className="wrktd-range"
            style={{
              background: `linear-gradient(to right, #B89A4E ${((designs - 1) / 199) * 100}%, rgba(255,255,255,0.1) ${((designs - 1) / 199) * 100}%)`,
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="label" style={{ color: "rgba(255,255,255,0.15)" }}>1</span>
            <span className="label" style={{ color: "rgba(255,255,255,0.15)" }}>200</span>
          </div>
        </div>

        {/* Output stats */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="p-6" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
            <p className="font-display font-bold text-white mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}>
              {fmt(products)}
            </p>
            <p className="label" style={{ color: "rgba(255,255,255,0.28)" }}>potential products</p>
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.15)" }}>
              {designs} designs × 5 product types
            </p>
          </div>

          <div className="p-6" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
            <p className="font-display font-bold text-white mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}>
              {weeks}w
            </p>
            <p className="label" style={{ color: "rgba(255,255,255,0.28)" }}>of manual work avoided</p>
            <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.15)" }}>
              estimated vs. one product at a time
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.18)" }}>
          Most sellers build product by product, manually configuring each SKU. WRKTD processes everything as one batch — designs in, catalog out.
        </p>
      </div>
    </section>
  );
}
