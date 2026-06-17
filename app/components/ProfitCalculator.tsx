"use client";
import { useState } from "react";

const PRODUCTS = [
  { id: "rug",      label: "Area Rug",       cost: 79,  defaultPrice: 149, defaultOrders: 15, maxPrice: 350, maxOrders: 100 },
  { id: "pillow",   label: "Woven Pillow",   cost: 34,  defaultPrice: 65,  defaultOrders: 25, maxPrice: 150, maxOrders: 200 },
  { id: "tapestry", label: "Wall Tapestry",  cost: 52,  defaultPrice: 98,  defaultOrders: 20, maxPrice: 250, maxOrders: 150 },
  { id: "blanket",  label: "Woven Blanket",  cost: 62,  defaultPrice: 108, defaultOrders: 18, maxPrice: 280, maxOrders: 100 },
  { id: "curtain",  label: "Shower Curtain", cost: 38,  defaultPrice: 72,  defaultOrders: 22, maxPrice: 180, maxOrders: 150 },
  { id: "tote",     label: "Woven Tote",     cost: 24,  defaultPrice: 45,  defaultOrders: 30, maxPrice: 120, maxOrders: 200 },
];

function formatDollar(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function Slider({ label, value, min, max, step, display, onChange }: {
  label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
        <span className="font-display font-bold text-white" style={{ fontSize: "1.4rem" }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="wrktd-range"
        style={{ background: `linear-gradient(to right, #B89A4E 0%, #B89A4E ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)` }} />
    </div>
  );
}

export default function ProfitCalculator() {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [price, setPrice] = useState(PRODUCTS[0].defaultPrice);
  const [orders, setOrders] = useState(PRODUCTS[0].defaultOrders);

  const product = PRODUCTS.find((p) => p.id === productId)!;
  const margin = Math.max(0, price - product.cost);
  const profit = margin * orders;

  function handleProductChange(id: string) {
    const p = PRODUCTS.find((x) => x.id === id)!;
    setProductId(id); setPrice(p.defaultPrice); setOrders(p.defaultOrders);
  }

  return (
    <section className="glass py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Profit Calculator</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-4">
          <h2 className="font-display font-extrabold text-white leading-[0.88]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            Calculate your<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>monthly profit.</span>
          </h2>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
            Pick a product, set your selling price, estimate your monthly orders — see what you could earn.
          </p>
        </div>

        <div className="grid lg:grid-cols-2" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          {/* Controls */}
          <div className="p-8 md:p-12 flex flex-col gap-10"
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Pick a product</span>
              <div className="relative">
                <select value={productId} onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full appearance-none text-white font-sans text-base font-medium pr-10 pl-4 py-3 cursor-pointer focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id} style={{ background: "#0E0E0E" }}>{p.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    style={{ color: "rgba(255,255,255,0.3)" }} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Manufacturing cost</span>
                <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>{formatDollar(product.cost)}</span>
              </div>
            </div>

            <Slider label="Set your selling price" value={price} min={product.cost + 5}
              max={product.maxPrice} step={1} display={formatDollar(price)} onChange={(v) => setPrice(v)} />

            <Slider label="Estimate monthly orders" value={orders} min={1}
              max={product.maxOrders} step={1} display={`${orders} orders`} onChange={(v) => setOrders(v)} />

            <div className="flex items-center justify-between py-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>Your margin per unit</span>
              <span className="font-semibold text-white text-sm">
                {formatDollar(margin)}{" "}
                <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>({Math.round((margin / price) * 100)}%)</span>
              </span>
            </div>
          </div>

          {/* Result */}
          <div className="p-8 md:p-12 flex flex-col justify-between gap-12"
            style={{ background: "rgba(6,6,6,0.85)" }}>
            <div>
              <p className="label mb-6" style={{ color: "rgba(255,255,255,0.2)" }}>Your monthly profit</p>
              <p className="font-display font-bold text-gold leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
                {formatDollar(profit)}
              </p>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
                Based on {orders} {product.label.toLowerCase()}{orders !== 1 ? "s" : ""} at {formatDollar(price)} each,
                after a {formatDollar(product.cost)} manufacturing cost per unit.
              </p>
            </div>

            <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-end justify-between">
                <div>
                  <p className="label mb-2" style={{ color: "rgba(255,255,255,0.15)" }}>Annualised</p>
                  <p className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "rgba(255,255,255,0.4)" }}>
                    {formatDollar(profit * 12)}
                  </p>
                </div>
                <a href="#preview" className="label bg-gold text-black px-6 py-3 transition-colors hover:bg-gold-lt">
                  Try it free →
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs mt-4 text-center" style={{ color: "rgba(255,255,255,0.18)" }}>
          Estimates only. Actual results depend on your audience, pricing strategy, and market demand.
        </p>
      </div>
    </section>
  );
}
