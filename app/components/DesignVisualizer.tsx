"use client";
import { useState } from "react";

type PatternDef = { id: string; label: string; bg: string; img: string; size: string; pos?: string };

const PATTERNS: PatternDef[] = [
  {
    id: "diamond", label: "Medallion", bg: "#1A1A1A",
    img: [
      "linear-gradient(45deg,  rgba(255,255,255,.12) 25%, transparent 25%)",
      "linear-gradient(-45deg, rgba(255,255,255,.12) 25%, transparent 25%)",
      "linear-gradient(45deg,  transparent 75%, rgba(255,255,255,.12) 75%)",
      "linear-gradient(-45deg, transparent 75%, rgba(255,255,255,.12) 75%)",
    ].join(","),
    size: "40px 40px",
  },
  {
    id: "stripe", label: "Stripe", bg: "#111",
    img: "repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 18px)",
    size: "100% 100%",
  },
  {
    id: "geo", label: "Geometric", bg: "#161616",
    img: [
      "linear-gradient(30deg,  rgba(255,255,255,.07) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,.07) 87.5%)",
      "linear-gradient(150deg, rgba(255,255,255,.07) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,.07) 87.5%)",
      "linear-gradient(30deg,  rgba(255,255,255,.07) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,.07) 87.5%)",
      "linear-gradient(150deg, rgba(255,255,255,.07) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,.07) 87.5%)",
    ].join(","),
    size: "40px 70px",
    pos: "0 0, 0 0, 20px 35px, 20px 35px",
  },
  {
    id: "dot", label: "Dot grid", bg: "#0E0E0E",
    img: "radial-gradient(circle, rgba(255,255,255,.14) 1px, transparent 1px)",
    size: "20px 20px",
  },
];

type ProductMockDef = { id: string; label: string; bg: string; w: number; h: number; extra?: React.CSSProperties };
const PRODUCTS: ProductMockDef[] = [
  { id: "rug",      label: "Area Rug",      bg: "#ede8de", w: 5, h: 7 },
  { id: "pillow",   label: "Woven Pillow",  bg: "#f4f2ef", w: 1, h: 1, extra: { borderRadius: 12 } },
  { id: "tapestry", label: "Wall Tapestry", bg: "#ede8de", w: 3, h: 4 },
  { id: "blanket",  label: "Blanket",       bg: "#e8e2d5", w: 5, h: 4 },
];

function PatternButton({ p, selected, onSelect }: { p: PatternDef; selected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="flex flex-col items-center gap-2 p-0"
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 8,
        backgroundColor: p.bg,
        backgroundImage: p.img,
        backgroundSize: p.size,
        backgroundPosition: p.pos ?? "0 0",
        outline: selected ? "1.5px solid var(--blue)" : "1px solid var(--bd)",
        outlineOffset: selected ? "3px" : "0px",
        transition: "outline 0.15s",
      }} />
      <span className="label transition-colors" style={{ color: selected ? "var(--blue)" : "var(--fg-4)" }}>
        {p.label}
      </span>
    </button>
  );
}

export default function DesignVisualizer() {
  const [pi, setPi] = useState(0);
  const [qi, setQi] = useState(0);
  const [key, setKey] = useState(0);

  const pattern = PATTERNS[pi];
  const product = PRODUCTS[qi];

  function pickPattern(i: number) { setPi(i); setKey(k => k + 1); }
  function pickProduct(i: number) { setQi(i); setKey(k => k + 1); }

  const patStyle = {
    backgroundColor: pattern.bg,
    backgroundImage: pattern.img,
    backgroundSize: pattern.size,
    backgroundPosition: pattern.pos ?? "0 0",
  };

  const aspect = product.w / product.h;

  return (
    <section className="py-40 px-6" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Design Visualizer</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4">
          <h2 className="font-display font-extrabold leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: "var(--fg)" }}>
            Pick a pattern.<br />
            <span style={{ color: "var(--fg-ghost-h)" }}>See it on any product.</span>
          </h2>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--fg-3)" }}>
            Every pattern below is a mockup of what a real woven product would look like — produced as part of your catalog.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Controls */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="label mb-5" style={{ color: "var(--fg-4)" }}>Pattern</p>
              <div className="flex flex-wrap gap-5">
                {PATTERNS.map((p, i) => (
                  <PatternButton key={p.id} p={p} selected={pi === i} onSelect={() => pickPattern(i)} />
                ))}
              </div>
            </div>
            <div>
              <p className="label mb-4" style={{ color: "var(--fg-4)" }}>Product</p>
              <div className="flex flex-col gap-2">
                {PRODUCTS.map((p, i) => (
                  <button key={p.id} onClick={() => pickProduct(i)}
                    className="text-left px-5 py-3 transition-all label"
                    style={{
                      background: qi === i ? "rgba(46,91,255,0.10)" : "var(--fg-ghost)",
                      border: qi === i ? "1px solid var(--blue)" : "1px solid var(--bd)",
                      color: qi === i ? "var(--blue)" : "var(--fg-3)",
                      borderRadius: 999, cursor: "pointer",
                    }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mockup preview */}
          <div key={key} style={{ animation: "wrapDesign 0.5s ease both" }}>
            <div className="relative mx-auto" style={{ maxWidth: aspect >= 1 ? 480 : 360 }}>
              <div style={{
                width: "100%",
                paddingBottom: `${(1 / aspect) * 100}%`,
                position: "relative",
                overflow: "hidden",
                borderRadius: 12,
                ...patStyle,
                ...product.extra,
              }} />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{product.label}</p>
                <p className="label" style={{ color: "var(--fg-4)" }}>mockup preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
