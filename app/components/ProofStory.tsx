const INK  = "#0A0A0F";
const INK2 = "rgba(10,10,15,0.62)";
const INK3 = "rgba(10,10,15,0.38)";
const INK4 = "rgba(10,10,15,0.22)";
const CARD = { background: "#ffffff", border: "1px solid rgba(10,10,15,0.08)" };

const details = [
  { title: "One design provided by the client",
    desc:  "Existing artwork they already owned â€” no new creative commissioned." },
  { title: "WRKTD built the full catalog",
    desc:  "Mockups, print-ready files, product listings, and fulfillment setup." },
  { title: "Orders shipped automatically",
    desc:  "No manual work per order after launch. Every sale fulfilled automatically." },
];

export default function ProofStory() {
  return (
    <section className="py-28 px-6" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Real result</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left â€” story + stat */}
          <div>
            <h2
              className="font-display font-extrabold leading-[0.9] mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: INK }}
            >
              A clothing brand had designs<br />
              <span style={{ color: INK4 }}>sitting unused for home decor.</span>
            </h2>

            <p className="text-base leading-relaxed mb-10" style={{ color: INK2 }}>
              We turned their existing artwork into rugs and pillows, connected their store to automatic fulfillment, and launched without any inventory on their end.
            </p>

            <div style={{ borderLeft: "2px solid #B89A4E", paddingLeft: "1.75rem" }}>
              <p className="font-display font-bold text-gold leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}>
                $25K
              </p>
              <p className="label mt-3" style={{ color: "rgba(184,154,78,0.55)" }}>
                first-month revenue â€” from designs they already owned
              </p>
            </div>
          </div>

          {/* Right â€” breakdown */}
          <div className="flex flex-col gap-4 lg:pt-8">
            {details.map(({ title, desc }) => (
              <div key={title} className="p-6" style={CARD}>
                <p className="text-sm font-semibold mb-2" style={{ color: INK }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: INK3 }}>{desc}</p>
              </div>
            ))}
            <p className="text-xs mt-2 leading-relaxed" style={{ color: INK3 }}>
              More founding clients are going live now. Case studies will follow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

