export default function TestimonialsSection() {
  return (
    <section className="grain py-28 px-6 bg-ink overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Proof</span>
        </div>
        <h2
          className="font-display font-light text-cream leading-[0.92] mb-20"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
        >
          Real designs.
          <br />
          <em className="not-italic" style={{ color: "rgba(250,247,242,0.35)" }}>
            Real results.
          </em>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main case study */}
          <div
            className="p-10 flex flex-col gap-10"
            style={{ border: "1px solid rgba(184,154,78,0.18)" }}
          >
            {/* Client tag */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: "rgba(184,154,78,0.1)", border: "1px solid rgba(184,154,78,0.2)" }}
              >
                🥋
              </div>
              <div>
                <p className="label text-gold/60 mb-1">Founding client</p>
                <p className="text-sm font-semibold text-cream">Martial arts clothing brand</p>
              </div>
            </div>

            {/* Stat */}
            <div style={{ borderLeft: "2px solid #B89A4E", paddingLeft: "1.5rem" }}>
              <p
                className="font-display font-light text-gold leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
              >
                $25K
              </p>
              <p className="label text-gold/50 mt-2">avg. first-month revenue · rugs only</p>
            </div>

            {/* Story */}
            <p className="text-sm leading-relaxed" style={{ color: "rgba(250,247,242,0.4)" }}>
              Provided one design. WRKTD turned it into a rug, built the full
              fulfillment pipeline — OrderDesk, manufacturing partner, Shopify connection,
              shipping configuration — and confirmed with a test order. From that point,
              every order manufactured and shipped automatically.
            </p>

            <div
              className="flex flex-col gap-3 pt-4"
              style={{ borderTop: "1px solid rgba(250,247,242,0.06)" }}
            >
              {[
                "One design provided by the client",
                "WRKTD handled file prep, mockups, and store connection",
                "Orders automated from day one",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <p className="text-xs" style={{ color: "rgba(250,247,242,0.35)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon */}
          <div
            className="p-10 flex flex-col justify-between gap-10"
            style={{ border: "1px solid rgba(250,247,242,0.06)" }}
          >
            <div>
              <p className="label text-cream/25 mb-8">Currently onboarding</p>
              <p
                className="font-display font-light text-cream/40 leading-snug"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
              >
                More founding clients are going live now. Case studies will follow.
              </p>
            </div>

            {/* Mini proof points */}
            <div className="flex flex-col gap-4">
              {[
                { label: "Product types launched",       val: "7" },
                { label: "Days from upload to live",     val: "5–7" },
                { label: "Days per order (mfg + ship)",  val: "5–10" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: "1px solid rgba(250,247,242,0.06)" }}
                >
                  <p className="text-xs" style={{ color: "rgba(250,247,242,0.28)" }}>{item.label}</p>
                  <p
                    className="font-display font-light"
                    style={{ fontSize: "1.6rem", color: "rgba(250,247,242,0.5)" }}
                  >
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
