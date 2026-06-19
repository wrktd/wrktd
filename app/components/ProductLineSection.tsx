const PRODUCTS = [
  {
    label: "Area Rug",
    note: "Woven · 5×7 ft and up",
    bg: "#ede8de",
    icon: (
      <svg viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 22 }}>
        <rect x="1" y="1" width="38" height="26" rx="1" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none"/>
        <rect x="4" y="4" width="32" height="20" rx="0.5" stroke="rgba(0,0,0,0.1)" strokeWidth="1" fill="rgba(0,0,0,0.04)"/>
        <line x1="1" y1="5" x2="4" y2="5" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="1" y1="9" x2="4" y2="9" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="1" y1="13" x2="4" y2="13" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="1" y1="17" x2="4" y2="17" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="1" y1="21" x2="4" y2="21" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="39" y1="5" x2="36" y2="5" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="39" y1="9" x2="36" y2="9" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="39" y1="13" x2="36" y2="13" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="39" y1="17" x2="36" y2="17" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="39" y1="21" x2="36" y2="21" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    label: "Woven Pillow",
    note: "Square or rectangular",
    bg: "#f4f2ef",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 28, height: 28 }}>
        <rect x="1" y="1" width="30" height="30" rx="5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none"/>
        <rect x="4" y="4" width="24" height="24" rx="3.5" stroke="rgba(0,0,0,0.09)" strokeWidth="1" fill="rgba(0,0,0,0.03)"/>
      </svg>
    ),
  },
  {
    label: "Canvas Art",
    note: "Gallery-wrapped · multiple sizes",
    bg: "#f9f9f9",
    icon: (
      <svg viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 22, height: 28 }}>
        <rect x="1" y="1" width="24" height="32" stroke="rgba(0,0,0,0.22)" strokeWidth="2" fill="none"/>
        <rect x="4" y="4" width="18" height="26" stroke="rgba(0,0,0,0.08)" strokeWidth="1" fill="rgba(0,0,0,0.03)"/>
      </svg>
    ),
  },
  {
    label: "Metal Print",
    note: "Gloss finish · sharp edges",
    bg: "#1c1c1c",
    dark: true,
    icon: (
      <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 26, height: 26 }}>
        <rect x="0.75" y="0.75" width="28.5" height="28.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
        <line x1="0" y1="0" x2="8" y2="8" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    label: "Wall Tapestry",
    note: "Fabric · wood rod included",
    bg: "#ede8de",
    icon: (
      <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 20, height: 30 }}>
        <rect x="1" y="5" width="22" height="30" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none"/>
        <rect x="0" y="2" width="24" height="4" rx="2" fill="rgba(122,74,30,0.7)"/>
      </svg>
    ),
  },
];

export default function ProductLineSection() {
  return (
    <section className="glass py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold" />
            <span className="label text-gold">Product catalog</span>
          </div>
          <h2 className="font-display font-extrabold text-white leading-[0.88]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            One design.<br />
            <span style={{ color: "rgba(255,255,255,0.22)" }}>A complete product line.</span>
          </h2>
        </div>

        {/* Branch layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-start">

          {/* ── Left: design source card ── */}
          <div className="flex-shrink-0 lg:w-56">
            <div style={{
              border: "1px solid rgba(184,154,78,0.35)",
              background: "rgba(184,154,78,0.05)",
              padding: "0",
              position: "relative",
            }}>
              {/* Corner accents */}
              {(["tl","tr","bl","br"] as const).map((c) => (
                <span key={c} style={{
                  position: "absolute",
                  top: c.startsWith("t") ? -1 : "auto", bottom: c.startsWith("b") ? -1 : "auto",
                  left: c.endsWith("l") ? -1 : "auto",  right: c.endsWith("r") ? -1 : "auto",
                  width: 8, height: 8,
                  borderTop:    c.startsWith("t") ? "2px solid #B89A4E" : "none",
                  borderBottom: c.startsWith("b") ? "2px solid #B89A4E" : "none",
                  borderLeft:   c.endsWith("l")   ? "2px solid #B89A4E" : "none",
                  borderRight:  c.endsWith("r")   ? "2px solid #B89A4E" : "none",
                }} />
              ))}
              {/* Sample design preview */}
              <div style={{ aspectRatio: "1/1", width: "100%", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sample-design.svg" alt="Your design" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </div>
            <p className="label mt-3" style={{ color: "rgba(255,255,255,0.28)" }}>Your design file</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>JPG · PNG · SVG · AI · PSD</p>
          </div>

          {/* ── Center connector ── */}
          <div className="hidden lg:flex items-center flex-shrink-0 self-stretch" style={{ paddingTop: "calc(112px / 2)" }}>
            {/* Horizontal line out from design card */}
            <div style={{ width: 48, height: 1, background: "rgba(184,154,78,0.25)" }} />
            {/* Dot */}
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(184,154,78,0.5)", flexShrink: 0 }} />
          </div>

          {/* ── Right: product branches ── */}
          <div className="flex-1 relative" style={{ paddingLeft: 0 }}>
            {/* Vertical trunk */}
            <div className="hidden lg:block" style={{
              position: "absolute", left: 0, top: 56, bottom: 56,
              width: 1, background: "rgba(184,154,78,0.2)",
            }} />

            <div className="flex flex-col gap-3">
              {PRODUCTS.map((p, i) => (
                <div key={p.label} className="flex items-center gap-4 lg:gap-6" style={{ position: "relative" }}>
                  {/* Branch line from trunk to card */}
                  <div className="hidden lg:block flex-shrink-0" style={{
                    width: 28, height: 1, background: "rgba(184,154,78,0.2)",
                  }} />

                  {/* Product card */}
                  <div
                    className="flex items-center gap-4 flex-1"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      padding: "14px 18px",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(184,154,78,0.2)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
                  >
                    {/* Product thumbnail */}
                    <div style={{
                      width: 52, height: 52, flexShrink: 0,
                      background: p.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      overflow: "hidden",
                    }}>
                      {/* Design image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/sample-design.svg" alt="" style={{ width: "80%", height: "80%", objectFit: "cover" }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white leading-tight">{p.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.32)" }}>{p.note}</p>
                    </div>

                    {/* Index number */}
                    <span className="font-display font-bold flex-shrink-0" style={{
                      fontSize: "1.5rem", lineHeight: 1,
                      color: "rgba(255,255,255,0.06)",
                    }}>
                      0{i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Math bar */}
        <div className="mt-20 py-8 px-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          {[
            ["10", "designs"], ["×"], ["5", "product types"], ["×"], ["3", "sizes"], ["="], ["150", "SKUs from one batch"],
          ].map((item, i) =>
            item.length === 1 ? (
              <span key={i} className="font-display font-light mx-4 hidden sm:block"
                style={{ fontSize: "2rem", color: "rgba(255,255,255,0.12)" }}>{item[0]}</span>
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
