"use client";
import { useState } from "react";

// Logarithmic slider mapping: position 0-100 → 1-10,000 designs
function posToDesigns(pos: number): number {
  return Math.max(1, Math.round(Math.pow(10, (pos / 100) * 4)));
}
function designsToPos(d: number): number {
  return (Math.log10(Math.max(1, d)) / 4) * 100;
}

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 1 : 2)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(n >= 100_000 ? 0 : 1)}K`;
  return String(n);
}

function fmtHours(h: number) {
  if (h >= 8760) return `${(h / 8760).toFixed(1)} yrs`;
  if (h >= 720)  return `${(h / 720).toFixed(1)} mo`;
  if (h >= 168)  return `${(h / 168).toFixed(1)} wks`;
  return `${Math.round(h)} hrs`;
}

export default function CatalogEstimator() {
  const [pos, setPos] = useState(designsToPos(20)); // default: 20 designs
  const designs = posToDesigns(pos);

  // Math
  const skus    = designs * 7 * 7;          // 7 product types × 7 sizes
  const images  = skus * 7;                 // 7 listing images per SKU
  const hours   = images * (20 / 60);       // 20 min per image manually

  const pct = pos / 100;

  return (
    <section id="estimator" className="glass-mid py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Estimate your catalog</span>
        </div>

        <h2 className="font-display font-extrabold text-white leading-[0.88] mb-5"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
          How many designs<br />
          <span style={{ color: "rgba(255,255,255,0.22)" }}>do you have?</span>
        </h2>

        <p className="text-base mb-14 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "28rem" }}>
          Drag to your design count. See the catalog — and the manual work — that WRKTD builds for you.
        </p>

        {/* Slider */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <span className="font-display font-bold text-gold" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 1 }}>
              {designs >= 1000 ? `${(designs / 1000).toFixed(designs >= 10000 ? 0 : 1)}K` : designs}
            </span>
            <span className="label mb-2" style={{ color: "rgba(255,255,255,0.22)" }}>designs</span>
          </div>

          <input
            type="range" min={0} max={100} step={0.5}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="wrktd-range"
            style={{
              background: `linear-gradient(to right, #B89A4E ${pct * 100}%, rgba(255,255,255,0.1) ${pct * 100}%)`,
            }}
          />
          <div className="flex justify-between mt-2">
            {["1", "10", "100", "1K", "10K"].map((l) => (
              <span key={l} className="label" style={{ color: "rgba(255,255,255,0.15)" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Output stats */}
        <div className="grid grid-cols-3 gap-px mb-6"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.06)" }}>
          {[
            {
              value: fmt(skus),
              label: "total SKUs",
              detail: `${designs} × 7 products × 7 sizes`,
            },
            {
              value: fmt(images),
              label: "listing images",
              detail: `${fmt(skus)} SKUs × 7 images each`,
              gold: true,
            },
            {
              value: fmtHours(hours),
              label: "hours avoided",
              detail: "at 20 min per image manually",
            },
          ].map((stat) => (
            <div key={stat.label} className="p-5 lg:p-7"
              style={{ background: "rgba(8,8,8,0.85)" }}>
              <p className="font-display font-bold mb-1"
                style={{
                  fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                  lineHeight: 1,
                  color: stat.gold ? "#B89A4E" : "rgba(255,255,255,0.9)",
                }}>
                {stat.value}
              </p>
              <p className="label mb-2" style={{ color: stat.gold ? "#B89A4E" : "rgba(255,255,255,0.55)" }}>
                {stat.label}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{stat.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
          Designs in, catalog out — as a single batch, not one product at a time. Every SKU, every image, every print-ready file.
        </p>
      </div>
    </section>
  );
}
