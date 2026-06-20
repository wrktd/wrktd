"use client";
import { useState } from "react";

const FG  = "#F0F0F0";
const FG3 = "rgba(240,240,240,0.34)";
const FG4 = "rgba(240,240,240,0.16)";

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
        <span className="text-sm" style={{ color: FG3 }}>{label}</span>
        <span className="font-display font-bold" style={{ fontSize: "1.5rem", color: FG }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="wrktd-range"
        style={{ background: `linear-gradient(to right, #B89A4E 0%, #B89A4E ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)` }} />
    </div>
  );
}

export default function ProfitCalculator() {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [price,  setPrice]  = useState(PRODUCTS[0].defaultPrice);
  const [orders, setOrders] = useState(PRODUCTS[0].defaultOrders);

  const product = PRODUCTS.find((p) => p.id === productId)!;
  const margin  = Math.max(0, price - product.cost);
  const profit  = margin * orders;

  function handleProductChange(id: string) {
    const p = PRODUCTS.find((x) => x.id === id)!;
    setProductId(id); setPrice(p.defaultPrice); setOrders(p.defaultOrders);
  }

  return (
    <section className="py-32 px-6" style={{ background: "#000000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Profit Calculator</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-4">
          <h2 className="font-display font-extrabold leading-[0.88]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: FG }}>
            Estimate what a<br />
            <span style={{ color: FG4 }}>product line could add.</span>
          </h2>
          <p className="text-base max-w-xs leading-relaxed" style={{ color: "rgba(240,240,240,0.50)" }}>
            Pick a product, set your selling price, estimate monthly orders — see a rough revenue potential.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Controls */}
          <div className="p-10 flex flex-col gap-10"
            style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
            <div className="flex flex-col gap-4">
              <span className="text-sm" style={{ color: FG3 }}>Pick a product</span>
              <div className="relative">
                <select value={productId} onChange={(e) => handleProductChange(e.target.value)}
                  className="w-full appearance-none font-sans text-base font-medium pr-10 pl-4 py-4 cursor-pointer focus:outline-none"
                  style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)", color: FG, borderRadius: 10 }}>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    style={{ color: FG3 }} strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3"
                style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                <span className="text-xs" style={{ color: FG3 }}>Product &amp; fulfillment cost</span>
                <span className="text-sm font-semibold" style={{ color: "rgba(240,240,240,0.45)" }}>quoted at onboarding</span>
              </div>
            </div>

            <Slider label="Set your selling price" value={price} min={product.cost + 5}
              max={product.maxPrice} step={1} display={formatDollar(price)} onChange={(v) => setPrice(v)} />
            <Slider label="Estimate monthly orders" value={orders} min={1}
              max={product.maxOrders} step={1} display={`${orders} orders`} onChange={(v) => setOrders(v)} />

            <div className="flex items-center justify-between pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
              <span className="text-sm" style={{ color: FG3 }}>Your margin per unit</span>
              <span className="font-semibold text-sm" style={{ color: FG }}>
                {formatDollar(margin)}{" "}
                <span style={{ color: FG3, fontWeight: 400 }}>({Math.round((margin / price) * 100)}%)</span>
              </span>
            </div>
          </div>

          {/* Result */}
          <div className="p-10 flex flex-col justify-between gap-10"
            style={{ background: "#050505", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16 }}>
            <div>
              <p className="label mb-8" style={{ color: "rgba(255,255,255,0.28)" }}>Estimated monthly revenue potential</p>
              <p className="font-display font-extrabold text-gold leading-none"
                style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}>
                {formatDollar(profit)}
              </p>
              <p className="text-sm mt-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
                Based on {orders} {product.label.toLowerCase()}{orders !== 1 ? "s" : ""} at {formatDollar(price)} each. Actual margin depends on your product cost, set during onboarding.
              </p>
            </div>
            <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-end justify-between">
                <div>
                  <p className="label mb-2" style={{ color: "rgba(255,255,255,0.16)" }}>Annualised</p>
                  <p className="font-display font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "rgba(255,255,255,0.35)" }}>
                    {formatDollar(profit * 12)}
                  </p>
                </div>
                <a href="#preview" className="label bg-gold text-black px-6 py-3 transition-colors hover:bg-gold-lt"
                  style={{ borderRadius: 999 }}>
                  Try it free →
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs mt-5 text-center" style={{ color: FG3 }}>
          Estimates only. Actual results depend on your audience, pricing strategy, and market demand.
        </p>
      </div>
    </section>
  );
}
