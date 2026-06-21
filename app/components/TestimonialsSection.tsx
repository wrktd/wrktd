export default function TestimonialsSection() {
  return (
    <section className="glass py-28 px-6 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8" style={{ background: "#2E5BFF" }} />
          <span className="label" style={{ color: "#2E5BFF" }}>Proof</span>
        </div>
        <h2 className="font-display font-extrabold text-white leading-[0.88] mb-20"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Real designs.<br />
          <span style={{ color: "rgba(255,255,255,0.2)" }}>Real results.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main case study */}
          <div className="p-10 flex flex-col gap-10" style={{ border: "1px solid rgba(46,91,255,0.15)" }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(46,91,255,0.08)", border: "1px solid rgba(46,91,255,0.18)" }}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  style={{ color: "rgba(46,91,255,0.6)" }} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="label mb-1" style={{ color: "rgba(46,91,255,0.4)" }}>Founding client</p>
                <p className="text-sm font-semibold text-white">Martial arts clothing brand</p>
              </div>
            </div>

            <div style={{ borderLeft: "2px solid #2E5BFF", paddingLeft: "1.5rem" }}>
              <p className="font-display font-bold leading-none" style={{ color: "#2E5BFF" }}
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>$25K</p>
              <p className="label mt-2" style={{ color: "rgba(46,91,255,0.4)" }}>avg. first-month revenue · rugs only</p>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
              Provided one design. WRKTD turned it into a rug, built the full fulfillment pipeline — OrderDesk,
              manufacturing partner, Shopify connection, shipping configuration — and confirmed with a test order.
              From that point, every order manufactured and shipped automatically.
            </p>

            <div className="flex flex-col gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              {[
                "One design provided by the client",
                "WRKTD handled file prep, mockups, and store connection",
                "Orders automated from day one",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: "#2E5BFF" }} />
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon */}
          <div className="p-10 flex flex-col justify-between gap-10"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p className="label mb-8" style={{ color: "rgba(255,255,255,0.15)" }}>Currently onboarding</p>
              <p className="font-display font-bold leading-snug" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "rgba(255,255,255,0.25)" }}>
                More founding clients are going live now. Case studies will follow.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: "Product types launched",      val: "7" },
                { label: "Days from upload to live",    val: "5–7" },
                { label: "Days per order (mfg + ship)", val: "5–10" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>{item.label}</p>
                  <p className="font-display font-bold" style={{ fontSize: "1.6rem", color: "rgba(255,255,255,0.4)" }}>
                    {item.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
