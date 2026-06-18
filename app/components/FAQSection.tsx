"use client";
import { useState } from "react";

const FAQS = [
  { q: "How long does it take to go live?", a: "About 5–7 days from your first upload. File production (mockups and print files) and store setup run in parallel — so you're not waiting on one before the other starts. After that, orders ship in 5–10 days automatically." },
  { q: "What file formats do you accept?", a: "JPG, PNG, PSD, SVG, and AI. If your file resolution is on the low side for larger products, we'll flag it and offer to attempt an upscale before it goes to manufacturing." },
  { q: "What if I already have a Shopify store?", a: "That's the most common setup. We connect directly to your existing store. Your customers never know anything changed on the backend — they just buy, and the order routes automatically." },
  { q: "Do I need to rename my files a specific way?", a: "No. Upload with whatever filenames you have. Our system renames and organizes everything automatically based on your store name and the products you select for each design." },
  { q: "What happens if an order fails or gets stuck?", a: "That's exactly what the monthly management plan covers. WRKTD monitors the fulfillment pipeline daily and handles routing issues directly. If something needs your attention, we reach out — you don't have to watch it yourself." },
  { q: "Do I need to keep a card on file?", a: "Yes. To keep orders shipping automatically, you need a valid payment method on file or a prepaid fulfillment balance. No orders route to manufacturing without cleared funds — if a payment issue comes up, we flag it and reach out before anything is delayed." },
  { q: "Can I keep selling on Etsy, Redbubble, or other marketplaces?", a: "Yes — WRKTD doesn't require exclusivity. Surface pattern designers and artists often keep their existing marketplace income and add a separate, higher-margin owned catalog through WRKTD alongside it." },
  { q: "What if the colors don't match my screen exactly?", a: "WRKTD prepares files to manufacturer specifications, but exact color matching depends on the manufacturing process, substrate, and equipment — factors outside our control. We do a test order before your catalog goes live so you can see real output before any customer does." },
];

function Item({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button className="w-full text-left py-6 flex items-start justify-between gap-6"
        onClick={() => setOpen(!open)}>
        <span className="font-display font-bold text-white leading-snug" style={{ fontSize: "1.15rem" }}>{q}</span>
        <span className="flex-shrink-0 mt-1 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", color: "#B89A4E" }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 400 : 0 }}>
        <p className="pb-6 text-sm leading-relaxed pr-8" style={{ color: "rgba(255,255,255,0.58)" }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="glass-light py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">FAQ</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div>
            <h2 className="font-display font-extrabold text-white leading-[0.88]"
              style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}>
              Frequently<br />asked<br />
              <span style={{ color: "rgba(255,255,255,0.2)" }}>questions.</span>
            </h2>
          </div>
          <div>
            {FAQS.map((faq, i) => <Item key={faq.q} q={faq.q} a={faq.a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
