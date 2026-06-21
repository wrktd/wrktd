export default function ProofStory() {
  const stats = [
    { value: "5–7",  unit: "days",      label: "Upload to live" },
    { value: "7+",   unit: "products",  label: "Per design" },
    { value: "343",  unit: "files",     label: "Per design batch" },
    { value: "0",    unit: "inventory", label: "Made to order" },
  ];

  return (
    <section className="py-40 px-6" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="pill"><span className="pill-dot" />Founding client</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start mb-20">
          {/* Left — story */}
          <div>
            <h2 className="font-display font-extrabold leading-[0.9] mb-8"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)", color: "var(--fg)", letterSpacing: "-0.03em" }}>
              Designs that were already<br />
              <span style={{ color: "var(--fg-3)" }}>sitting unused.</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--fg-2)", maxWidth: "34rem" }}>
              A clothing brand with cool, unique designs had art sitting unused for home decor. We turned their existing designs into rugs and pillows and connected their store to ship automatically.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-3)", maxWidth: "34rem" }}>
              From designs they already owned — no new artwork, no inventory, no manual fulfillment.
            </p>
          </div>

          {/* Right — big number + detail cards */}
          <div>
            <div className="mb-8 p-8 card" style={{ border: "1px solid rgba(47,91,255,0.18)" }}>
              <div style={{ borderLeft: "3px solid var(--blue)", paddingLeft: "1.5rem" }}>
                <p className="font-display font-extrabold leading-none mb-2"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", color: "var(--blue)" }}>
                  $20K–$30K
                </p>
                <p className="label" style={{ color: "var(--fg-4)" }}>first-month revenue · rugs only</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "One design provided", sub: "by the client" },
                { label: "WRKTD handled", sub: "file prep, mockups, store setup" },
                { label: "Orders automated", sub: "from day one" },
              ].map((item) => (
                <div key={item.label} className="p-4 card">
                  <p className="text-xs font-semibold mb-1" style={{ color: "var(--fg)" }}>{item.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--fg-4)" }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--bd)" }}>
          {stats.map((s) => (
            <div key={s.label} className="px-8 py-8" style={{ background: "var(--bg-card)" }}>
              <p className="font-display font-extrabold leading-none mb-1"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "var(--fg)" }}>
                {s.value}
                <span className="text-base font-normal ml-2" style={{ color: "var(--fg-4)" }}>{s.unit}</span>
              </p>
              <p className="label mt-2" style={{ color: "var(--fg-4)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
