const STEPS = [
  {
    n: "01", time: "Day 1", title: "Upload your designs",
    body: "Drop in your existing artwork, logos, or patterns. No special file prep — we accept JPG, PNG, SVG, AI, and PSD. We handle everything from here.",
  },
  {
    n: "02", time: "Days 1–7", title: "WRKTD builds your catalog",
    body: "We adapt each design to every product, generate all mockup angles and listing images, prepare manufacturing-ready print files, and connect your store. Total time to live is about 5–7 days.",
  },
  {
    n: "03", time: "Ongoing", title: "Orders ship automatically",
    body: "Your store is connected and live. When a customer buys, the order routes to manufacturing and ships in 5–10 days. WRKTD monitors the system and handles any issues — you don't have to watch it.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-40 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Process</span>
        </div>

        <h2 className="font-display font-extrabold leading-[0.88] mb-20"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "var(--fg)" }}>
          From upload to live orders<br />
          <span style={{ color: "var(--fg-ghost-h)" }}>in about 5–7 days.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {STEPS.map((step) => (
            <div key={step.n} className="p-8 flex flex-col card" style={{ minHeight: 280 }}>
              <div className="font-display font-extrabold mb-10 select-none"
                style={{ fontSize: "5rem", color: "rgba(46,91,255,0.10)", lineHeight: 1 }}>
                {step.n}
              </div>
              <span className="label block mb-4" style={{ color: "var(--blue)", opacity: 0.8 }}>{step.time}</span>
              <h3 className="font-display font-bold mb-4"
                style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)", color: "var(--fg)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed mt-auto" style={{ color: "var(--fg-3)" }}>{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 p-8 flex flex-col md:flex-row items-start gap-6 md:gap-16 card">
          <p className="label flex-shrink-0" style={{ color: "var(--fg-4)" }}>What we tell clients</p>
          <p className="text-base font-light" style={{ color: "var(--fg-3)", lineHeight: 1.7 }}>
            "We'll have your catalog ready and your store connected in about 5–7 days. After that, when your customers buy something, it's designed to ship automatically in 5–10 days — and we monitor the system to catch and fix anything that needs attention."
          </p>
        </div>
      </div>
    </section>
  );
}
