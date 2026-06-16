const PRODUCTS = [
  { label: "Area Rugs",          accent: "#C8B89A" },
  { label: "Woven Pillows",      accent: "#B8C4B0" },
  { label: "Wall Tapestries",    accent: "#ABABBC" },
  { label: "Blankets & Throws",  accent: "#C4AE92" },
  { label: "Shower Curtains",    accent: "#A8BAC0" },
  { label: "Woven Totes",        accent: "#C0B4A4" },
  { label: "Wall Art Prints",    accent: "#B4B8A8" },
];

export default function ProductLineSection() {
  return (
    <section className="py-28 px-6 bg-cream-warm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold" />
            <span className="label text-gold">One design, many products</span>
          </div>
          <h2
            className="font-display font-light text-ink leading-[0.92]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            One design becomes
            <br />
            <em className="not-italic text-ink/55">a whole product family.</em>
          </h2>
        </div>

        {/* Layout: design + arrow + products */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20 mb-16">
          {/* Your design */}
          <div className="flex-shrink-0 text-center">
            <div
              className="w-36 h-36 flex items-center justify-center mb-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(184,154,78,0.12) 0%, rgba(184,154,78,0.04) 100%)",
                border: "1px solid rgba(184,154,78,0.28)",
              }}
            >
              <span className="text-5xl select-none">🎨</span>
            </div>
            <p className="label text-ink-muted">Your design</p>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex flex-col items-center gap-2 flex-shrink-0">
            <div className="h-px w-16 bg-ink-muted/20" />
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-ink-muted/30" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <p className="label text-ink-muted/50" style={{ writingMode: "initial" }}>WRKTD builds</p>
          </div>
          <div className="lg:hidden label text-ink-muted/50">↓ WRKTD builds</div>

          {/* Products grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
            {PRODUCTS.map((p) => (
              <div
                key={p.label}
                className="px-4 py-3 text-center"
                style={{
                  background: `${p.accent}22`,
                  border: `1px solid ${p.accent}55`,
                }}
              >
                <p className="text-xs font-semibold text-ink leading-tight">{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The math */}
        <div
          className="py-8 px-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 text-center"
          style={{ border: "1px solid rgba(12,10,9,0.08)", background: "rgba(12,10,9,0.02)" }}
        >
          {[
            ["10", "designs"],
            ["×"],
            ["5", "product types"],
            ["×"],
            ["3", "sizes"],
            ["="],
            ["150", "SKUs from one batch"],
          ].map((item, i) =>
            item.length === 1 ? (
              <span
                key={i}
                className="font-display font-light text-ink-muted/40 mx-4 hidden sm:block"
                style={{ fontSize: "2rem" }}
              >
                {item[0]}
              </span>
            ) : (
              <div key={i} className="flex flex-col items-center mx-5">
                <span
                  className="font-display font-light"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: i === 6 ? "#B89A4E" : "#0C0A09",
                    lineHeight: 1,
                  }}
                >
                  {item[0]}
                </span>
                <span className="label text-ink-muted mt-1">{item[1]}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
