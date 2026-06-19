"use client";
import { useState } from "react";

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
  const [active, setActive] = useState(1); // index into SCALE_EXAMPLES

  const PER_DESIGN = 7 * 7 * 7; // 343
  const current    = SCALE_EXAMPLES[active];
  const totalFiles = current.designs * PER_DESIGN;
  const maxFiles   = SCALE_EXAMPLES[SCALE_EXAMPLES.length - 1].designs * PER_DESIGN;

  return (
    <section className="glass py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold" />
            <span className="label text-gold">What WRKTD produces</span>
          </div>
          <h2 className="font-display font-extrabold text-white leading-[0.88] mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            One file.{" "}
            <span className="text-gold">343 deliverables.</span>
          </h2>
          <p className="text-lg font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "36rem" }}>
            Every design you submit becomes a complete, listing-ready product family — across every product type, every size, and every listing image your store needs.
          </p>
        </div>

        {/* ── Multiplication cascade ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-2"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.06)" }}>
          {[
            {
              num: "1",
              unit: "design file",
              sub: "any format",
              items: null,
              op: "×",
            },
            {
              num: "7",
              unit: "product types",
              sub: "rugs · pillows · canvas · metal · tapestry + more",
              items: PRODUCT_TYPES,
              op: "×",
            },
            {
              num: "7",
              unit: "sizes each",
              sub: "from 8\"×10\" to 9×12 ft",
              items: null,
              op: "×",
            },
            {
              num: "7",
              unit: "listing images",
              sub: "per product, per size",
              items: LISTING_IMAGES.map((l) => l.label),
              op: "=",
            },
          ].map((col, i) => (
            <div key={i} className="relative p-6 lg:p-8"
              style={{ background: "rgba(8,8,8,0.85)" }}>
              {/* Operator badge */}
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden lg:flex
                items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                style={{ background: "#060606", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>
                {col.op}
              </div>

              <p className="font-display font-bold text-gold mb-0.5"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)", lineHeight: 1 }}>
                {col.num}
              </p>
              <p className="text-sm font-semibold text-white mb-1">{col.unit}</p>
              <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.28)" }}>{col.sub}</p>

              {col.items && (
                <div className="flex flex-col gap-1.5">
                  {col.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "rgba(184,154,78,0.5)" }} />
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* = result bar */}
        <div className="flex items-center gap-6 py-6 px-8 mb-16"
          style={{ border: "1px solid rgba(184,154,78,0.2)", background: "rgba(184,154,78,0.04)", borderTop: "none" }}>
          <p className="font-display font-bold text-gold"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1 }}>
            343
          </p>
          <div>
            <p className="text-white font-semibold">store-ready files from a single design</p>
            <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Production files · Print-ready exports · Listing imagery — all included
            </p>
          </div>
        </div>

        {/* ── Listing image breakdown ── */}
        <div className="mb-20">
          <p className="label mb-5" style={{ color: "rgba(255,255,255,0.28)" }}>
            The 7 listing images WRKTD produces per product, per size
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {LISTING_IMAGES.map((img, i) => (
              <div key={img.label} className="p-4"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                <div className="w-6 h-6 mb-3 flex items-center justify-center"
                  style={{ background: "rgba(184,154,78,0.08)" }}>
                  <span className="font-display font-bold text-gold" style={{ fontSize: "0.7rem" }}>
                    0{i + 1}
                  </span>
                </div>
                <p className="text-xs font-semibold text-white mb-0.5 leading-tight">{img.label}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{img.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
            Most sellers spend 15–20 min per image making these manually. WRKTD generates every one. You don't touch a single file.
          </p>
        </div>

        {/* ── Scale selector ── */}
        <div>
          <p className="label mb-6" style={{ color: "rgba(255,255,255,0.28)" }}>
            See the scale — pick a catalog size
          </p>

          {/* Tab buttons */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {SCALE_EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="label px-5 py-3 transition-all duration-200"
                style={{
                  border: i === active ? "1px solid #B89A4E" : "1px solid rgba(255,255,255,0.08)",
                  background: i === active ? "rgba(184,154,78,0.08)" : "rgba(255,255,255,0.02)",
                  color: i === active ? "#B89A4E" : "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                }}>
                {ex.label}
              </button>
            ))}
          </div>

          {/* Scale output */}
          <div className="grid grid-cols-3 gap-px"
            style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.06)" }}>
            {[
              { val: fmt(current.designs * 7 * 7), label: "SKUs", sub: `${current.designs} designs × 7 products × 7 sizes` },
              { val: fmt(totalFiles),               label: "listing images", sub: `${fmt(current.designs * 49)} SKUs × 7 images each` },
              { val: fmt(Math.round(totalFiles * 20 / 60)), label: "hours of work", sub: "at 20 min per image, done manually" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-8"
                style={{ background: "rgba(8,8,8,0.85)" }}>
                <p className="font-display font-bold text-white mb-1"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1 }}>
                  {stat.val}
                </p>
                <p className="label text-gold mb-2">{stat.label}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Scale bar */}
          <div className="mt-4 h-0.5 w-full" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full bg-gold transition-all duration-500"
              style={{ width: `${(totalFiles / maxFiles) * 100}%`, opacity: 0.5 }} />
          </div>

          <p className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.30)" }}>
            WRKTD processes every design as a single batch — whether that's 10 designs or 10,000. Same turnaround. No per-design manual work on your end.
          </p>
        </div>

      </div>
    </section>
  );
}
