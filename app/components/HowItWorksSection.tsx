const STEPS = [
  {
    n: "01", time: "Day 1", title: "Upload your designs",
    body: "Drop in your existing artwork, logos, or patterns. No special file prep — we accept JPG, PNG, SVG, AI, and PSD. We handle everything from here.",
  },
  {
    n: "02", time: "Days 1–7", title: "WRKTD builds your catalog",
    body: "We adapt each design to every product, generate all mockup angles, prepare manufacturing-ready print files, and connect your store. Setup and file production run in parallel — total time to live is about 5–7 days.",
  },
  {
    n: "03", time: "Ongoing", title: "Orders ship automatically",
    body: "Your store is connected and live. When a customer buys, the order routes to manufacturing and ships in 5–10 days. WRKTD monitors the system and handles any issues — you don't have to watch it.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="glass-mid py-28 px-6 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Process</span>
        </div>
        <h2 className="font-display font-extrabold text-white leading-[0.88] mb-20"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          From upload to live orders<br />
          <span style={{ color: "rgba(255,255,255,0.2)" }}>in about 5–7 days.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-0">
          {STEPS.map((step, i) => (
            <div key={step.n} className="relative"
              style={{
                borderLeft: i === 0 ? "1px solid rgba(184,154,78,0.15)" : "none",
                borderRight: "1px solid rgba(184,154,78,0.15)",
                padding: "0 2.5rem 0 2.5rem",
              }}>
              <div className="font-display font-bold mb-8 leading-none select-none"
                style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "rgba(184,154,78,0.08)", lineHeight: 1 }}>
                {step.n}
              </div>
              <span className="label block mb-3" style={{ color: "rgba(184,154,78,0.4)" }}>{step.time}</span>
              <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 py-8 px-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-16"
          style={{ borderTop: "1px solid rgba(184,154,78,0.1)" }}>
          <p className="label flex-shrink-0" style={{ color: "rgba(184,154,78,0.4)" }}>Client-facing language</p>
          <p className="font-display font-light text-lg md:text-xl" style={{ color: "rgba(255,255,255,0.32)", lineHeight: 1.5 }}>
            "We'll have your catalog ready and your store connected in about 5–7 days. After that, when your customers buy something, it's designed to ship automatically in 5–10 days — and we monitor the system to catch and fix anything that needs attention."
          </p>
        </div>
      </div>
    </section>
  );
}
