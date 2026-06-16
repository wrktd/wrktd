const POINTS = [
  {
    glyph: "I",
    title: "Done-for-you, not DIY",
    body: "Most POD platforms are still largely DIY. Even when bulk tools exist, the seller is responsible for product setup, artwork placement, listings, SKUs, and fulfillment configuration. WRKTD is done-for-you and batch-oriented.",
  },
  {
    glyph: "II",
    title: "File accuracy, guaranteed",
    body: "Manufacturing partners don't review artwork before printing — if a file is wrong, the product prints wrong and ships to your customer. WRKTD adapts and prepares every file correctly before it ever reaches manufacturing.",
  },
  {
    glyph: "III",
    title: "Monitored, not abandoned",
    body: "Your fulfillment pipeline is designed to run automatically after setup, with WRKTD monitoring the system and handling routing issues — not just hosting it and hoping nothing breaks.",
  },
  {
    glyph: "IV",
    title: "Batch-first from day one",
    body: "One design becomes a full product family in a single batch. Ten designs, five product types, three sizes — 150 SKUs in 1–3 days. Scale your catalog without doing each product one at a time.",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="py-28 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Why WRKTD</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2
            className="font-display font-light text-ink leading-[0.92]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            A different kind
            <br />
            <em className="not-italic text-ink/50">of home decor partner.</em>
          </h2>
          <p className="text-sm text-ink-muted max-w-xs leading-relaxed">
            There are other ways to put designs on products. Here's what separates WRKTD.
          </p>
        </div>

        {/* Points grid */}
        <div className="grid md:grid-cols-2 gap-px bg-ink/[0.06]">
          {POINTS.map((p, i) => (
            <div
              key={p.title}
              className="bg-cream p-10 flex flex-col gap-6"
              style={{ minHeight: 280 }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-display font-light"
                  style={{ fontSize: "3.5rem", lineHeight: 1, color: "rgba(184,154,78,0.25)" }}
                >
                  {p.glyph}
                </span>
                <span className="label text-ink-muted/40">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3
                  className="font-display font-medium text-ink mb-3"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
