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
    size: "24px 24px",
    pos: "0 0, 0 12px, 12px -12px, -12px 0px",
  },
  {
    id: "stripe", label: "Diagonal", bg: "#141414",
    img: "repeating-linear-gradient(-45deg, rgba(255,255,255,.1) 0px, rgba(255,255,255,.1) 5px, transparent 5px, transparent 22px)",
    size: "auto",
  },
  {
    id: "dot", label: "Dot Grid", bg: "#181818",
    img: "radial-gradient(circle at 50% 50%, rgba(255,255,255,.18) 28%, transparent 28%)",
    size: "18px 18px",
  },
  {
    id: "grid", label: "Woven", bg: "#141414",
    img: [
      "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)",
      "linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
    ].join(","),
    size: "20px 20px",
  },
  {
    id: "cross", label: "Lattice", bg: "#161616",
    img: [
      "linear-gradient(45deg,  rgba(255,255,255,.1) 1.5px, transparent 1.5px)",
      "linear-gradient(-45deg, rgba(255,255,255,.1) 1.5px, transparent 1.5px)",
    ].join(","),
    size: "18px 18px",
  },
  {
    id: "ring", label: "Circles", bg: "#141414",
    img: [
      "radial-gradient(circle at 50% 50%, transparent 7px, rgba(255,255,255,.12) 7px, rgba(255,255,255,.12) 9px, transparent 9px)",
      "radial-gradient(circle at 0   0,   transparent 7px, rgba(255,255,255,.07) 7px, rgba(255,255,255,.07) 9px, transparent 9px)",
    ].join(","),
    size: "28px 28px",
  },
];

type ProductDef = { id: string; label: string; ratio: string; radius: string; shadow: string };

const PRODUCTS: ProductDef[] = [
  { id: "rug",      label: "Area Rug",    ratio: "4/3", radius: "6px",  shadow: "0 16px 64px rgba(0,0,0,0.7)" },
  { id: "pillow",   label: "Pillow",      ratio: "1/1", radius: "28px", shadow: "0 20px 72px rgba(0,0,0,0.7), inset 0 -4px 16px rgba(0,0,0,0.4)" },
  { id: "tapestry", label: "Tapestry",    ratio: "3/4", radius: "2px",  shadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)" },
  { id: "blanket",  label: "Blanket",     ratio: "5/4", radius: "6px",  shadow: "0 12px 48px rgba(0,0,0,0.65)" },
];

function Thumb({ p, selected, onClick }: { p: PatternDef; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div
        className="w-full transition-all duration-200"
        style={{
          aspectRatio: "1",
          backgroundColor: p.bg,
          backgroundImage: p.img,
          backgroundSize: p.size,
          backgroundPosition: p.pos ?? "0 0",
          outline: selected ? "1.5px solid #B89A4E" : "1px solid rgba(255,255,255,0.06)",
          outlineOffset: selected ? "3px" : "0px",
        }}
      />
      <span className="label transition-colors" style={{ color: selected ? "#B89A4E" : "rgba(255,255,255,0.25)" }}>
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

  return (
    <section className="glass relative py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Design Visualizer</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4">
          <h2 className="font-display font-extrabold text-white leading-[0.88] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            Pick a pattern.<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>See it on any product.</span>
          </h2>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
            Sample patterns — your own artwork replaces these in your real catalog.
          </p>
        </div>

        <div className="grid lg:grid-cols-[180px_1fr] gap-12 items-start">
          {/* Thumbnails */}
          <div>
            <p className="label mb-4" style={{ color: "rgba(255,255,255,0.18)" }}>Pattern</p>
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
              {PATTERNS.map((p, i) => (
                <Thumb key={p.id} p={p} selected={i === pi} onClick={() => pickPattern(i)} />
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative overflow-hidden w-full"
              style={{
                maxWidth: product.id === "tapestry" ? 300 : product.id === "pillow" ? 340 : 460,
                aspectRatio: product.ratio,
                borderRadius: product.radius,
                boxShadow: product.shadow,
              }}
            >
              <div className="absolute inset-0" style={{ backgroundColor: pattern.bg }} />
              <div
                key={`${pi}-${qi}-${key}`}
                className="absolute inset-0"
                style={{ ...patStyle, animation: "wrapDesign 0.65s cubic-bezier(0.16,1,0.3,1) forwards" }}
              />
              {/* depth overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)" }} />
              {/* edge lines */}
              {(product.id === "rug" || product.id === "blanket") && (
                <>
                  <div className="absolute left-0 right-0 top-0 h-1.5"
                    style={{ background: "repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)" }} />
                  <div className="absolute left-0 right-0 bottom-0 h-1.5"
                    style={{ background: "repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,0.04) 3px,rgba(255,255,255,0.04) 4px)" }} />
                </>
              )}
            </div>

            {/* Product selector */}
            <div className="flex flex-wrap gap-2 justify-center">
              {PRODUCTS.map((p, i) => (
                <button key={p.id} onClick={() => pickProduct(i)}
                  className="label px-5 py-2.5 transition-all duration-200"
                  style={{
                    background: i === qi ? "rgba(255,255,255,0.1)" : "transparent",
                    color: i === qi ? "#fff" : "rgba(255,255,255,0.3)",
                    border: i === qi ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.07)",
                  }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
