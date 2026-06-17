"use client";
import { useState } from "react";

/* ── Patterns ─────────────────────────────────────────────────── */
type PatternDef = {
  id: string;
  label: string;
  bg: string;
  img: string;
  size: string;
  pos?: string;
};

const PATTERNS: PatternDef[] = [
  {
    id: "diamond",
    label: "Medallion",
    bg: "#E4D5BA",
    img: [
      "linear-gradient(45deg,  rgba(184,154,78,.55) 25%, transparent 25%)",
      "linear-gradient(-45deg, rgba(184,154,78,.55) 25%, transparent 25%)",
      "linear-gradient(45deg,  transparent 75%, rgba(184,154,78,.55) 75%)",
      "linear-gradient(-45deg, transparent 75%, rgba(184,154,78,.55) 75%)",
    ].join(", "),
    size: "24px 24px",
    pos: "0 0, 0 12px, 12px -12px, -12px 0px",
  },
  {
    id: "stripe",
    label: "Diagonal",
    bg: "#DDD0B2",
    img: "repeating-linear-gradient(-45deg, rgba(139,105,20,.65) 0px, rgba(139,105,20,.65) 5px, transparent 5px, transparent 22px)",
    size: "auto",
  },
  {
    id: "dot",
    label: "Polka",
    bg: "#E8D9C0",
    img: "radial-gradient(circle at 50% 50%, rgba(184,154,78,.85) 32%, transparent 32%)",
    size: "18px 18px",
  },
  {
    id: "grid",
    label: "Woven",
    bg: "#E4D8C0",
    img: [
      "linear-gradient(rgba(139,105,20,.45) 1.5px, transparent 1.5px)",
      "linear-gradient(90deg, rgba(139,105,20,.45) 1.5px, transparent 1.5px)",
    ].join(", "),
    size: "20px 20px",
  },
  {
    id: "cross",
    label: "Lattice",
    bg: "#DDD0B2",
    img: [
      "linear-gradient(45deg,  rgba(184,154,78,.6) 1.5px, transparent 1.5px)",
      "linear-gradient(-45deg, rgba(184,154,78,.6) 1.5px, transparent 1.5px)",
    ].join(", "),
    size: "18px 18px",
  },
  {
    id: "ring",
    label: "Circles",
    bg: "#E4D5BA",
    img: [
      "radial-gradient(circle at 50% 50%, transparent 7px, rgba(184,154,78,.65) 7px, rgba(184,154,78,.65) 9.5px, transparent 9.5px)",
      "radial-gradient(circle at 0   0,   transparent 7px, rgba(184,154,78,.35) 7px, rgba(184,154,78,.35) 9.5px, transparent 9.5px)",
    ].join(", "),
    size: "28px 28px",
  },
];

/* ── Products ─────────────────────────────────────────────────── */
type ProductDef = {
  id: string;
  label: string;
  ratio: string;
  radius: string;
  shadow: string;
};

const PRODUCTS: ProductDef[] = [
  {
    id: "rug",
    label: "Area Rug",
    ratio: "4/3",
    radius: "10px",
    shadow: "0 12px 48px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)",
  },
  {
    id: "pillow",
    label: "Pillow",
    ratio: "1/1",
    radius: "30px",
    shadow:
      "0 16px 56px rgba(0,0,0,0.22), inset 0 -5px 16px rgba(0,0,0,0.14), inset 0 3px 8px rgba(255,255,255,0.06)",
  },
  {
    id: "tapestry",
    label: "Tapestry",
    ratio: "3/4",
    radius: "3px",
    shadow: "0 4px 28px rgba(0,0,0,0.28), 0 0 0 2px rgba(180,180,200,0.5)",
  },
  {
    id: "blanket",
    label: "Blanket",
    ratio: "5/4",
    radius: "8px",
    shadow: "0 10px 40px rgba(0,0,0,0.18)",
  },
];

/* ── Thumbnail ────────────────────────────────────────────────── */
function Thumb({
  pattern,
  selected,
  onClick,
}: {
  pattern: PatternDef;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div
        className="w-full transition-all duration-200"
        style={{
          aspectRatio: "1",
          backgroundColor: pattern.bg,
          backgroundImage: pattern.img,
          backgroundSize: pattern.size,
          backgroundPosition: pattern.pos ?? "0 0",
          outline: selected
            ? "2px solid #B89A4E"
            : "1px solid rgba(250,247,242,0.08)",
          outlineOffset: selected ? "3px" : "0px",
        }}
      />
      <span
        className="label transition-colors"
        style={{ color: selected ? "#B89A4E" : "rgba(250,247,242,0.3)" }}
      >
        {pattern.label}
      </span>
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function DesignVisualizer() {
  const [pi, setPi] = useState(0);
  const [qi, setQi] = useState(0);
  const [key, setKey] = useState(0);

  const pattern = PATTERNS[pi];
  const product = PRODUCTS[qi];

  function pickPattern(i: number) {
    setPi(i);
    setKey((k) => k + 1);
  }

  function pickProduct(i: number) {
    setQi(i);
    setKey((k) => k + 1);
  }

  const patStyle = {
    backgroundColor: pattern.bg,
    backgroundImage: pattern.img,
    backgroundSize: pattern.size,
    backgroundPosition: pattern.pos ?? "0 0",
  };

  return (
    <section className="py-28 px-6 bg-ink-soft overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Design Visualizer</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4">
          <h2
            className="font-display font-light text-cream leading-[0.92]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Pick a pattern.
            <br />
            <em className="not-italic" style={{ color: "rgba(250,247,242,0.3)" }}>
              See it on any product.
            </em>
          </h2>
          <p
            className="text-sm max-w-xs leading-relaxed"
            style={{ color: "rgba(250,247,242,0.3)" }}
          >
            These are sample patterns. In your real catalog, every product
            would show your own artwork.
          </p>
        </div>

        {/* Interactive area */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-12 items-start">
          {/* Pattern thumbnails */}
          <div className="flex flex-col gap-2">
            <p className="label mb-3" style={{ color: "rgba(250,247,242,0.2)" }}>
              Pattern
            </p>
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
              {PATTERNS.map((p, i) => (
                <Thumb
                  key={p.id}
                  pattern={p}
                  selected={i === pi}
                  onClick={() => pickPattern(i)}
                />
              ))}
            </div>
          </div>

          {/* Product mockup */}
          <div className="flex flex-col items-center gap-8">
            {/* Mockup */}
            <div
              className="relative overflow-hidden w-full"
              style={{
                maxWidth:
                  product.id === "tapestry"
                    ? 320
                    : product.id === "pillow"
                    ? 360
                    : 480,
                aspectRatio: product.ratio,
                borderRadius: product.radius,
                boxShadow: product.shadow,
              }}
            >
              {/* Base colour */}
              <div
                className="absolute inset-0"
                style={{ backgroundColor: pattern.bg }}
              />

              {/* Animated pattern layer */}
              <div
                key={`${pi}-${qi}-${key}`}
                className="absolute inset-0"
                style={{
                  ...patStyle,
                  animation:
                    "wrapDesign 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              />

              {/* Lighting/depth overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                }}
              />

              {/* Fringe detail for rug/blanket */}
              {(product.id === "rug" || product.id === "blanket") && (
                <>
                  <div
                    className="absolute left-0 right-0 top-0 h-2"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                    }}
                  />
                  <div
                    className="absolute left-0 right-0 bottom-0 h-2"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                    }}
                  />
                </>
              )}
            </div>

            {/* Product type selector */}
            <div className="flex flex-wrap gap-2 justify-center">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => pickProduct(i)}
                  className="label px-5 py-2.5 transition-all duration-200"
                  style={{
                    background: i === qi ? "#B89A4E" : "transparent",
                    color:
                      i === qi ? "#0C0A09" : "rgba(250,247,242,0.38)",
                    border:
                      i === qi
                        ? "1px solid #B89A4E"
                        : "1px solid rgba(250,247,242,0.1)",
                  }}
                >
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
