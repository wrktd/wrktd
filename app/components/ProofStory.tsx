const details = [
  { title: "One design provided by the client",
    desc:  "Existing artwork they already owned — no new creative commissioned." },
  { title: "WRKTD built the full catalog",
    desc:  "Mockups, print-ready files, product listings, and fulfillment setup." },
  { title: "Orders shipped automatically",
    desc:  "No manual work per order after launch. Every sale fulfilled automatically." },
];

export default function ProofStory() {
  return (
    <section className="py-40 px-6" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Real result</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          <div>
            <h2 className="font-display font-extrabold leading-[0.88] mb-10"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)", color: "var(--fg)" }}>
              A clothing brand had designs<br />
              <span style={{ color: "var(--fg-ghost-h)" }}>sitting unused for home decor.</span>
            </h2>

            <p className="text-lg leading-relaxed mb-12" style={{ color: "var(--fg-2)", maxWidth: "34rem" }}>
              We turned their existing artwork into rugs and pillows, connected their store to automatic fulfillment, and launched without any inventory on their end.
            </p>

            <div style={{ borderLeft: "2px solid var(--blue)", paddingLeft: "2rem" }}>
              <p className="font-display font-extrabold leading-none"
                style={{ fontSize: "clamp(4rem, 10vw, 7rem)", color: "var(--blue)" }}>
                $25K
              </p>
              <p className="label mt-4" style={{ color: "var(--fg-3)" }}>
                first-month revenue — from designs they already owned
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:pt-4">
            {details.map(({ title, desc }) => (
              <div key={title} className="p-7 card">
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--fg)" }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-3)" }}>{desc}</p>
              </div>
            ))}
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--fg-4)" }}>
              More founding clients are going live now. Case studies will follow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
