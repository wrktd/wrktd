"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "How long does it take to go live?",
    a: "About 5–7 days from your first upload. The first 1–3 days cover building your mockups and print files. The store connection, OrderDesk setup, and test order run in parallel. After that, orders ship in 5–10 days — automatically.",
  },
  {
    q: "What file formats do you accept?",
    a: "JPG, PNG, PSD, SVG, and AI. If your file resolution is on the low side for larger products, we'll flag it and offer to attempt an upscale before it goes to manufacturing.",
  },
  {
    q: "What if I already have a Shopify store?",
    a: "Perfect — that's the most common setup. We connect directly to your existing store. Your customers never know anything changed on the backend.",
  },
  {
    q: "Do I need to rename my files a specific way?",
    a: "No. Upload with whatever filenames you have. Our system renames and organizes everything automatically based on your store name and the products you select.",
  },
  {
    q: "What happens if an order fails or gets stuck?",
    a: "That's exactly what the monthly management plan covers. WRKTD monitors the fulfillment pipeline daily and handles routing issues directly. If something needs your attention, we reach out — you don't have to watch it yourself.",
  },
  {
    q: "Do I need to keep a card on file?",
    a: "Yes. To keep orders shipping automatically, you need a valid payment method on file or a prepaid fulfillment balance. If a payment issue comes up, we flag it and reach out before anything is delayed — no orders go to manufacturing without cleared funds.",
  },
  {
    q: "Can I keep selling on Etsy, Redbubble, or other marketplaces too?",
    a: "Yes. WRKTD doesn't require exclusivity. Surface pattern designers and artists often keep their existing marketplace income and add a separate, higher-margin owned catalog through WRKTD.",
  },
  {
    q: "What if the colors don't match exactly what I see on screen?",
    a: "WRKTD prepares files to manufacturer specifications, but exact color matching and screen-to-product reproduction depend on the manufacturing process, substrate, and equipment — factors outside our control. We'll do a test order before your catalog goes live so you can see the real output.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-100 last:border-0">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-stone-800 text-base leading-snug">{q}</span>
        <span className={`text-stone-400 flex-shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-5 text-stone-500 leading-relaxed text-sm">{a}</p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
            Frequently asked questions
          </h2>
        </div>
        <div className="bg-stone-50 rounded-2xl border border-stone-100 px-8">
          {FAQS.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
