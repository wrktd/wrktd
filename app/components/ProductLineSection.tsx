"use client";
import { useState } from "react";

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
  const current  = SCALE_EXAMPLES[active];
  const total    = current.designs * 343;
  const maxTotal = SCALE_EXAMPLES[SCALE_EXAMPLES.length - 1].designs * 343;

  return (
    <section className="py-40 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />What WRKTD produces</span>
        </div>

        <div className="max-w-3xl mb-20">
          <h2 className="font-display font-extrabold leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "var(--fg)" }}>
            One file.{" "}
            <span style={{ color: "var(--blue)" }}>343 deliverables.</span>
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: "var(--fg-2)" }}>
            Every design becomes a complete, listing-ready product family — across every product type, every size, and every listing image your store needs.
          </p>
        </div>

        {/* Multiplication cascade */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { num: "1", unit: "design file",    sub: "any format",                             items: null },
            { num: "7", unit: "product types",  sub: "rugs · pillows · canvas · metal + more", items: PRODUCT_TYPES },
            { num: "7", unit: "sizes each",     sub: 'from 8"×10" to 9×12 ft',                 items: null },
            { num: "7", unit: "listing images", sub: "per product, per size",                   items: LISTING_IMAGES.map((l) => l.label) },
          ].map((col, i) => (
            <div key={i} className="p-7 flex flex-col card">
              <p className="font-display font-extrabold mb-1"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, color: "var(--blue)" }}>
                {col.num}
              </p>
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--fg)" }}>{col.unit}</p>
              <p className="text-xs mb-5" style={{ color: "var(--fg-3)" }}>{col.sub}</p>
              {col.items && (
                <div className="flex flex-col gap-1.5 mt-auto">
                  {col.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(46,91,255,0.5)" }} />
                      <span className="text-xs" style={{ color: "var(--fg-3)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* = result */}
        <div className="flex items-center gap-8 p-8 mb-16"
          style={{ background: "var(--blue-dim)", border: "1px solid rgba(46,91,255,0.14)", borderRadius: 16 }}>
          <p className="font-display font-extrabold" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", lineHeight: 1, color: "var(--blue)" }}>
            343
          </p>
          <div>
            <p className="font-semibold text-lg" style={{ color: "var(--fg)" }}>store-ready files from a single design</p>
            <p className="text-sm mt-1" style={{ color: "var(--fg-3)" }}>
              Production files · Print-ready exports · Listing imagery — all included
            </p>
          </div>
        </div>

        {/* Listing images */}
        <div className="mb-20">
          <p className="label mb-6" style={{ color: "var(--fg-4)" }}>The 7 listing images WRKTD produces per product, per size</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {LISTING_IMAGES.map((img, i) => (
              <div key={img.label} className="p-5 card">
                <div className="w-7 h-7 mb-4 flex items-center justify-center rounded-full"
                  style={{ background: "rgba(46,91,255,0.12)" }}>
                  <span className="font-display font-bold" style={{ fontSize: "0.65rem", color: "var(--blue)" }}>0{i + 1}</span>
                </div>
                <p className="text-xs font-semibold mb-1 leading-tight" style={{ color: "var(--fg)" }}>{img.label}</p>
                <p className="text-xs" style={{ color: "var(--fg-3)" }}>{img.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scale selector */}
        <div>
          <p className="label mb-6" style={{ color: "var(--fg-4)" }}>See the scale — pick a catalog size</p>
          <div className="flex gap-2 mb-8 flex-wrap">
            {SCALE_EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="label px-5 py-3 transition-all duration-200"
                style={{
                  border: i === active ? "1px solid var(--blue)" : "1px solid var(--bd)",
                  background: i === active ? "rgba(46,91,255,0.10)" : "var(--bg-card)",
                  color: i === active ? "var(--blue)" : "var(--fg-3)",
                  cursor: "pointer",
                  borderRadius: 999,
                }}>
                {ex.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { val: fmt(current.designs * 49), label: "SKUs",           sub: `${current.designs} × 7 products × 7 sizes` },
              { val: fmt(total),                 label: "listing images", sub: `${fmt(current.designs * 49)} SKUs × 7 images each` },
              { val: fmt(current.designs * 4),   label: "hours avoided",  sub: "at 4 hrs per design done manually" },
            ].map((stat) => (
              <div key={stat.label} className="px-7 py-8 card">
                <p className="font-display font-extrabold mb-1"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1, color: "var(--fg)" }}>
                  {stat.val}
                </p>
                <p className="label mb-2" style={{ color: "var(--blue)" }}>{stat.label}</p>
                <p className="text-xs" style={{ color: "var(--fg-3)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 h-0.5 w-full rounded-full" style={{ background: "var(--bd)" }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(total / maxTotal) * 100}%`, background: "var(--blue)", opacity: 0.35 }} />
          </div>

          <p className="text-sm mt-6" style={{ color: "var(--fg-3)" }}>
            WRKTD processes every design as a single batch — whether that's 10 designs or 10,000. Same turnaround. No per-design manual work on your end.
          </p>
        </div>
      </div>
    </section>
  );
}
