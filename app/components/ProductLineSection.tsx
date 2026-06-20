"use client";
import { useState } from "react";

const FG  = "#F0F0F0";
const FG2 = "rgba(240,240,240,0.58)";
const FG3 = "rgba(240,240,240,0.34)";
const FG4 = "rgba(240,240,240,0.16)";

const PRODUCT_TYPES = ["Area Rugs","Woven Pillows","Canvas Art","Metal Prints","Wall Tapestries","Blankets & Throws","Shower Curtains"];
const LISTING_IMAGES = [
  { label: "White background", sub: "clean cut-out" },
  { label: "Studio scene",     sub: "styled setup" },
  { label: "Room context",     sub: "in a real room" },
  { label: "Detail closeup",   sub: "texture + print" },
  { label: "Scale reference",  sub: "size in context" },
  { label: "Flatlay",          sub: "overhead angle" },
  { label: "Lifestyle",        sub: "in use" },
];
const SCALE_EXAMPLES = [
  { designs: 10,    label: "10 designs" },
  { designs: 100,   label: "100 designs" },
  { designs: 1000,  label: "1,000 designs" },
  { designs: 10000, label: "10,000 designs" },
];
function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return String(n);
}

export default function ProductLineSection() {
  const [active, setActive] = useState(1);
  const PER_DESIGN = 343;
  const current    = SCALE_EXAMPLES[active];
  const totalFiles = current.designs * PER_DESIGN;
  const maxFiles   = SCALE_EXAMPLES[SCALE_EXAMPLES.length - 1].designs * PER_DESIGN;

  return (
    <section className="py-32 px-6" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />What WRKTD produces</span>
        </div>

        <div className="max-w-3xl mb-20">
          <h2 className="font-display font-extrabold leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: FG }}>
            One file.{" "}
            <span className="text-gold">343 deliverables.</span>
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: FG2 }}>
            Every design becomes a complete, listing-ready product family — across every product type, every size, and every listing image your store needs.
          </p>
        </div>

        {/* Multiplication cascade — bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { num: "1",  unit: "design file",    sub: "any format",                              items: null,                               op: "×" },
            { num: "7",  unit: "product types",  sub: "rugs · pillows · canvas · metal + more",  items: PRODUCT_TYPES,                      op: "×" },
            { num: "7",  unit: "sizes each",     sub: 'from 8"×10" to 9×12 ft',                  items: null,                               op: "×" },
            { num: "7",  unit: "listing images", sub: "per product, per size",                    items: LISTING_IMAGES.map((l) => l.label), op: "=" },
          ].map((col, i) => (
            <div key={i} className="p-7 flex flex-col"
              style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
              <p className="font-display font-extrabold text-gold mb-1"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
                {col.num}
              </p>
              <p className="text-sm font-semibold mb-1" style={{ color: FG }}>{col.unit}</p>
              <p className="text-xs mb-5" style={{ color: FG3 }}>{col.sub}</p>
              {col.items && (
                <div className="flex flex-col gap-1.5 mt-auto">
                  {col.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(184,154,78,0.4)" }} />
                      <span className="text-xs" style={{ color: FG3 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* = result bar */}
        <div className="flex items-center gap-8 p-8 mb-16"
          style={{ background: "rgba(184,154,78,0.05)", border: "1px solid rgba(184,154,78,0.12)", borderRadius: 16 }}>
          <p className="font-display font-extrabold text-gold"
            style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", lineHeight: 1 }}>
            343
          </p>
          <div>
            <p className="font-semibold text-lg" style={{ color: FG }}>store-ready files from a single design</p>
            <p className="text-sm mt-1" style={{ color: FG3 }}>
              Production files · Print-ready exports · Listing imagery — all included
            </p>
          </div>
        </div>

        {/* Listing image breakdown */}
        <div className="mb-20">
          <p className="label mb-6" style={{ color: FG3 }}>The 7 listing images WRKTD produces per product, per size</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {LISTING_IMAGES.map((img, i) => (
              <div key={img.label} className="p-5"
                style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12 }}>
                <div className="w-7 h-7 mb-4 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(184,154,78,0.10)" }}>
                  <span className="font-display font-bold text-gold" style={{ fontSize: "0.65rem" }}>
                    0{i + 1}
                  </span>
                </div>
                <p className="text-xs font-semibold mb-1 leading-tight" style={{ color: FG }}>{img.label}</p>
                <p className="text-xs" style={{ color: FG3 }}>{img.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scale selector */}
        <div>
          <p className="label mb-6" style={{ color: FG3 }}>See the scale — pick a catalog size</p>
          <div className="flex gap-2 mb-8 flex-wrap">
            {SCALE_EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="label px-5 py-3 transition-all duration-200"
                style={{
                  border: i === active ? "1px solid #B89A4E" : "1px solid rgba(255,255,255,0.08)",
                  background: i === active ? "rgba(184,154,78,0.08)" : "#0C0C0C",
                  color: i === active ? "#B89A4E" : FG3,
                  cursor: "pointer",
                  borderRadius: 999,
                }}>
                {ex.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { val: fmt(current.designs * 7 * 7), label: "SKUs",           sub: `${current.designs} designs × 7 products × 7 sizes` },
              { val: fmt(totalFiles),               label: "listing images", sub: `${fmt(current.designs * 49)} SKUs × 7 images each` },
              { val: fmt(current.designs * 4),      label: "hours avoided",  sub: "at 4 hrs per design done manually" },
            ].map((stat) => (
              <div key={stat.label} className="px-7 py-8"
                style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14 }}>
                <p className="font-display font-extrabold mb-1"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1, color: FG }}>
                  {stat.val}
                </p>
                <p className="label text-gold mb-2">{stat.label}</p>
                <p className="text-xs" style={{ color: FG3 }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 h-0.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full rounded-full bg-gold transition-all duration-500"
              style={{ width: `${(totalFiles / maxFiles) * 100}%`, opacity: 0.4 }} />
          </div>

          <p className="text-sm mt-6" style={{ color: FG3 }}>
            WRKTD processes every design as a single batch — whether that's 10 designs or 10,000. Same turnaround. No per-design manual work on your end.
          </p>
        </div>
      </div>
    </section>
  );
}
