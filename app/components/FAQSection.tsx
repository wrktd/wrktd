"use client";
import { useState } from "react";

const FG  = "#F0F0F0";
const FG2 = "rgba(240,240,240,0.58)";
const FG3 = "rgba(240,240,240,0.34)";

const FAQS = [
  { q: "Do I need my own designs?", a: "Yes. WRKTD takes your existing artwork, logos, or patterns and turns them into a full product catalog. We don't create original designs — your art is the input; we handle everything from there." },
  { q: "What if I have a lot of designs?", a: "That's exactly what WRKTD is built for. Whether it's 10 or 10,000 — every design you submit is processed as a single batch, not one at a time. There's no extra per-design work on your end." },
  { q: "How long until I'm live?", a: "About 5–7 days from your first upload. File production (mockups, print files, listing images) and store setup run in parallel. After that, when a customer buys, orders ship in 5–10 days — designed to run automatically, monitored by WRKTD." },
  { q: "What payment is required to get started?", a: "A card on file or a prepaid fulfillment balance is required before your account is active. This keeps orders shipping automatically. No payment method on file means orders can't route to manufacturing — we flag any issue before anything gets delayed." },
  { q: "What file formats do you accept?", a: "JPG, PNG, PSD, SVG, and AI. If your file is below target resolution for larger products, we flag it and offer an upscale attempt before anything goes to manufacturing." },
  { q: "What if an order fails or gets stuck?", a: "That's what the monthly management plan covers. WRKTD monitors the fulfillment pipeline and handles routing issues directly. If something needs your attention, we reach out — you don't have to watch it yourself." },
  { q: "Can I keep selling on other platforms?", a: "Yes. WRKTD doesn't require exclusivity. Many clients keep existing marketplace income and add a higher-margin owned catalog through WRKTD alongside it." },
];

function Item({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <button className="w-full text-left py-7 flex items-start justify-between gap-6"
        onClick={() => setOpen(!open)}>
        <span className="font-display font-bold leading-snug" style={{ fontSize: "1.1rem", color: FG }}>{q}</span>
        <span className="flex-shrink-0 mt-1 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", color: "#B89A4E" }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 400 : 0 }}>
        <p className="pb-7 text-sm leading-relaxed pr-8" style={{ color: FG2 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-32 px-6" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />FAQ</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-20 items-start">
          <div>
            <h2 className="font-display font-extrabold leading-[0.88]"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)", color: FG }}>
              Frequently<br />asked<br />
              <span style={{ color: "rgba(240,240,240,0.14)" }}>questions.</span>
            </h2>
            <p className="mt-8 text-sm leading-relaxed" style={{ color: FG3 }}>
              Everything else gets answered during onboarding.
            </p>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {FAQS.map((faq, i) => <Item key={faq.q} q={faq.q} a={faq.a} defaultOpen={i === 0} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
