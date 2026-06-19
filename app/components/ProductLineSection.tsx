"use client";
import { useState } from "react";

const INK  = "#111009";
const INK2 = "rgba(17,16,9,0.62)";
const INK3 = "rgba(17,16,9,0.38)";
const INK4 = "rgba(17,16,9,0.22)";
const BORDER = "1px solid rgba(17,16,9,0.09)";

const PRODUCT_TYPES = [
  "Area Rugs", "Woven Pillows", "Canvas Art", "Metal Prints",
  "Wall Tapestries", "Blankets & Throws", "Shower Curtains",
];

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

  const PER_DESIGN = 7 * 7 * 7; // 343
  const current    = SCALE_EXAMPLES[active];
  const totalFiles = current.designs * PER_DESIGN;
  const maxFiles   = SCALE_EXAMPLES[SCALE_EXAMPLES.length - 1].designs * PER_DESIGN;

  return (
    <section className="py-28 px-6" style={{ background: "#EDE9E3" }}>
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold" />
            <span className="label text-gold">What WRKTD produces</span>
          </div>
          <h2 className="font-display font-extrabold leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: INK }}>
            One file.{" "}
            <span className="text-gold">343 deliverables.</span>
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: INK2, maxWidth: "36rem" }}>
            Every design becomes a complete, listing-ready product family — across every product type, every size, and every listing image your store needs.
          </p>
        </div>

        {/* Multiplication cascade */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-0"
          style={{ border: BORDER, background: "rgba(17,16,9,0.09)" }}>
          {[
            { num: "1",  unit: "design file",    sub: "any format",                          items: null,                               op: "×" },
            { num: "7",  unit: "product types",  sub: "rugs · pillows · canvas · metal + more", items: PRODUCT_TYPES,                  op: "×" },
            { num: "7",  unit: "sizes each",     sub: 'from 8"×10" to 9×12 ft',              items: null,                               op: "×" },
            { num: "7",  unit: "listing images", sub: "per product, per size",                items: LISTING_IMAGES.map((l) => l.label), op: "=" },
          ].map((col, i) => (
            <div key={i} className="relative p-6 lg:p-8" style={{ background: "#ffffff" }}>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex
                items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                style={{ background: "#EDE9E3", border: BORDER, color: INK4 }}>
                {col.op}
              </div>

              <p className="font-display font-bold text-gold mb-0.5"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", lineHeight: 1 }}>
                {col.num}
              </p>
              <p className="text-sm font-semibold mb-1" style={{ color: INK }}>{col.unit}</p>
              <p className="text-xs mb-4" style={{ color: INK3 }}>{col.sub}</p>

              {col.items && (
                <div className="flex flex-col gap-1.5">
                  {col.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(184,154,78,0.5)" }} />
                      <span className="text-xs" style={{ color: INK3 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* = result bar */}
        <div className="flex items-center gap-6 py-6 px-8 mb-16"
          style={{ border: BORDER, borderTop: "none", background: "rgba(184,154,78,0.06)" }}>
          <p className="font-display font-bold text-gold"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1 }}>
            343
          </p>
          <div>
            <p className="font-semibold" style={{ color: INK }}>store-ready files from a single design</p>
            <p className="text-sm mt-0.5" style={{ color: INK3 }}>
              Production files · Print-ready exports · Listing imagery — all included
            </p>
          </div>
        </div>

        {/* Listing image breakdown */}
        <div className="mb-20">
          <p className="label mb-5" style={{ color: INK3 }}>
            The 7 listing images WRKTD produces per product, per size
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {LISTING_IMAGES.map((img, i) => (
              <div key={img.label} className="p-4" style={{ border: BORDER, background: "#ffffff" }}>
                <div className="w-6 h-6 mb-3 flex items-center justify-center"
                  style={{ background: "rgba(184,154,78,0.08)" }}>
                  <span className="font-display font-bold text-gold" style={{ fontSize: "0.7rem" }}>
                    0{i + 1}
                  </span>
                </div>
                <p className="text-xs font-semibold mb-0.5 leading-tight" style={{ color: INK }}>{img.label}</p>
                <p className="text-xs" style={{ color: INK3 }}>{img.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: INK3 }}>
            Most sellers spend 15–20 min per image making these manually. WRKTD generates every one.
          </p>
        </div>

        {/* Scale selector */}
        <div>
          <p className="label mb-6" style={{ color: INK3 }}>See the scale — pick a catalog size</p>

          <div className="flex gap-2 mb-8 flex-wrap">
            {SCALE_EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="label px-5 py-3 transition-all duration-200"
                style={{
                  border: i === active ? "1px solid #B89A4E" : BORDER,
                  background: i === active ? "rgba(184,154,78,0.08)" : "#ffffff",
                  color: i === active ? "#B89A4E" : INK3,
                  cursor: "pointer",
                }}>
                {ex.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-px"
            style={{ border: BORDER, background: "rgba(17,16,9,0.09)" }}>
            {[
              { val: fmt(current.designs * 7 * 7), label: "SKUs",           sub: `${current.designs} designs × 7 products × 7 sizes` },
              { val: fmt(totalFiles),               label: "listing images", sub: `${fmt(current.designs * 49)} SKUs × 7 images each` },
              { val: fmt(current.designs * 4),      label: "hours avoided",  sub: "at 4 hrs per design done manually" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-8" style={{ background: "#ffffff" }}>
                <p className="font-display font-bold mb-1"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1, color: INK }}>
                  {stat.val}
                </p>
                <p className="label text-gold mb-2">{stat.label}</p>
                <p className="text-xs" style={{ color: INK3 }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 h-0.5 w-full" style={{ background: "rgba(17,16,9,0.07)" }}>
            <div className="h-full bg-gold transition-all duration-500"
              style={{ width: `${(totalFiles / maxFiles) * 100}%`, opacity: 0.45 }} />
          </div>

          <p className="text-xs mt-6" style={{ color: INK3 }}>
            WRKTD processes every design as a single batch — whether that's 10 designs or 10,000. Same turnaround. No per-design manual work on your end.
          </p>
        </div>

      </div>
    </section>
  );
}
