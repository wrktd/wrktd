const PRODUCTS = [
  { label: "Area Rugs" },
  { label: "Woven Pillows" },
  { label: "Wall Tapestries" },
  { label: "Blankets & Throws" },
  { label: "Shower Curtains" },
  { label: "Woven Totes" },
  { label: "Wall Art Prints" },
];

export default function ProductLineSection() {
  return (
    <section className="glass py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold" />
            <span className="label text-gold">One design, many products</span>
          </div>
          <h2 className="font-display font-extrabold text-white leading-[0.88]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            One design becomes<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>a whole product family.</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20 mb-16">
          {/* Your design */}
          <div className="flex-shrink-0 text-center">
            <div className="w-36 h-36 flex items-center justify-center mb-3"
              style={{ background: "rgba(184,154,78,0.08)", border: "1px solid rgba(184,154,78,0.2)" }}>
              <svg width="48" height="48" viewBox="0 0 54 42" fill="rgba(184,154,78,0.5)" aria-hidden="true">
                <path d="M0 2 L14 40 L27 14 L40 40 L54 2 L47 2 L40 32 L27 8 L14 32 L7 2 Z" />
              </svg>
            </div>
            <p className="label" style={{ color: "rgba(255,255,255,0.2)" }}>Your design</p>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex flex-col items-center gap-2 flex-shrink-0">
            <div className="h-px w-16" style={{ background: "rgba(255,255,255,0.08)" }} />
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              style={{ color: "rgba(255,255,255,0.15)" }} strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <p className="label" style={{ color: "rgba(255,255,255,0.15)" }}>WRKTD builds</p>
          </div>
          <div className="lg:hidden label" style={{ color: "rgba(255,255,255,0.2)" }}>↓ WRKTD builds</div>

          {/* Products grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PRODUCTS.map((p) => (
              <div key={p.label} className="px-4 py-3 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="text-xs font-semibold text-white leading-tight">{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Math bar */}
        <div className="py-8 px-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          {[
            ["10", "designs"], ["×"], ["5", "product types"], ["×"], ["3", "sizes"], ["="], ["150", "SKUs from one batch"],
          ].map((item, i) =>
            item.length === 1 ? (
              <span key={i} className="font-display font-light mx-4 hidden sm:block"
                style={{ fontSize: "2rem", color: "rgba(255,255,255,0.15)" }}>{item[0]}</span>
            ) : (
              <div key={i} className="flex flex-col items-center mx-5">
                <span className="font-display font-bold"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: i === 6 ? "#B89A4E" : "rgba(255,255,255,0.85)", lineHeight: 1 }}>
                  {item[0]}
                </span>
                <span className="label mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>{item[1]}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
