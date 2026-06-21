"use client";
import { useState } from "react";

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
  const [pos, setPos] = useState(designsToPos(20));
  const designs = posToDesigns(pos);
  const skus   = designs * 7 * 7;
  const images = skus * 7;
  const hours  = designs * 4;
  const pct = pos / 100;

  return (
    <section id="estimator" className="py-40 px-6" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-4xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Estimate your catalog</span>
        </div>

        <h2 className="font-display font-extrabold leading-[0.88] mb-6"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "var(--fg)" }}>
          How many designs<br />
          <span style={{ color: "var(--fg-ghost-h)" }}>do you have?</span>
        </h2>

        <p className="text-lg mb-16 leading-relaxed" style={{ color: "var(--fg-2)", maxWidth: "30rem" }}>
          Drag to your design count. See the catalog — and the manual work — that WRKTD builds for you.
        </p>

        {/* Slider */}
        <div className="mb-12 p-8 card">
          <div className="flex items-end justify-between mb-6">
            <span className="font-display font-extrabold" style={{ fontSize: "clamp(3.5rem, 9vw, 6rem)", lineHeight: 1, color: "var(--blue)" }}>
              {designs >= 1000 ? `${(designs / 1000).toFixed(designs >= 10000 ? 0 : 1)}K` : designs}
            </span>
            <span className="label mb-2" style={{ color: "var(--fg-4)" }}>designs</span>
          </div>
          <input
            type="range" min={0} max={100} step={0.5}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="wrktd-range"
            style={{ background: `linear-gradient(to right, var(--blue) ${pct * 100}%, var(--bd) ${pct * 100}%)` }}
          />
          <div className="flex justify-between mt-3">
            {["1", "10", "100", "1K", "10K"].map((l) => (
              <span key={l} className="label" style={{ color: "var(--fg-4)" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Output stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: fmt(skus),        label: "total SKUs",      detail: `${designs} × 7 products × 7 sizes`, blue: false },
            { value: fmt(images),      label: "listing images",  detail: `${fmt(skus)} SKUs × 7 images each`,  blue: true  },
            { value: fmtHours(hours),  label: "hours avoided",   detail: "at 4 hrs per design manually",       blue: false },
          ].map((stat) => (
            <div key={stat.label} className="p-6 card">
              <p className="font-display font-extrabold mb-1"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", lineHeight: 1, color: stat.blue ? "var(--blue)" : "var(--fg)" }}>
                {stat.value}
              </p>
              <p className="label mb-2" style={{ color: stat.blue ? "var(--blue)" : "var(--fg-4)" }}>{stat.label}</p>
              <p className="text-xs" style={{ color: "var(--fg-4)" }}>{stat.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-sm leading-relaxed" style={{ color: "var(--fg-3)" }}>
          Designs in, catalog out — as a single batch, not one product at a time. Every SKU, every image, every print-ready file.
        </p>
      </div>
    </section>
  );
}
