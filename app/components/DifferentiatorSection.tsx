const POINTS = [
  {
    glyph: "I", title: "Done-for-you, not DIY",
    body: "Most POD platforms are still largely DIY. Even when bulk tools exist, the seller is responsible for product setup, artwork placement, listings, SKUs, and fulfillment configuration. WRKTD is done-for-you and batch-oriented.",
  },
  {
    glyph: "II", title: "File accuracy, guaranteed",
    body: "Manufacturing partners don't review artwork before printing — if a file is wrong, the product prints wrong and ships to your customer. WRKTD adapts and prepares every file correctly before it ever reaches manufacturing.",
  },
  {
    glyph: "III", title: "Monitored, not abandoned",
    body: "Your fulfillment pipeline is designed to run automatically after setup, with WRKTD monitoring the system and handling routing issues — not just hosting it and hoping nothing breaks.",
  },
  {
    glyph: "IV", title: "Batch-first from day one",
    body: "One design becomes a full product family in a single batch. Ten designs, five product types, three sizes — 150 SKUs in 1–3 days. Scale your catalog without doing each product one at a time.",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="glass-light py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Why WRKTD</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2 className="font-display font-extrabold text-white leading-[0.88]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            A different kind<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>of home decor partner.</span>
          </h2>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
            There are other ways to put designs on products. Here's what separates WRKTD.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
          {POINTS.map((p, i) => (
            <div key={p.title} className="p-10 flex flex-col gap-6"
              style={{ background: "rgba(8,8,8,0.6)", minHeight: 280 }}>
              <div className="flex items-start justify-between">
                <span className="font-display font-bold"
                  style={{ fontSize: "3.5rem", lineHeight: 1, color: "rgba(184,154,78,0.18)" }}>
                  {p.glyph}
                </span>
                <span className="label" style={{ color: "rgba(255,255,255,0.12)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="font-display font-bold text-white mb-3"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
