const POINTS = [
  {
    n: "01", title: "Done-for-you, not DIY",
    body: "Most POD platforms are still largely DIY. Even when bulk tools exist, the seller is responsible for product setup, artwork placement, listings, SKUs, and fulfillment configuration. WRKTD is done-for-you and batch-oriented.",
  },
  {
    n: "02", title: "Preflighted before production",
    body: "Manufacturing partners don't review artwork before printing — if a file is wrong, the product prints wrong and ships to your customer. WRKTD adapts and prepares every file before it ever reaches manufacturing.",
  },
  {
    n: "03", title: "All listing imagery handled",
    body: "Most sellers spend hours making 5–8 listing photos per product. WRKTD generates every one — white background, lifestyle, room context, detail — for every product at every size. You don't touch a single file.",
  },
  {
    n: "04", title: "Batch-first from day one",
    body: "One design becomes a full product family in a single batch. Ten designs, seven product types, seven sizes — 490 SKUs in 1–3 days. Scale your catalog without doing each product one at a time.",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="py-40 px-6" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Why WRKTD</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2 className="font-display font-extrabold leading-[0.88]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "var(--fg)" }}>
            A different kind<br />
            <span style={{ color: "var(--fg-ghost-h)" }}>of home decor partner.</span>
          </h2>
          <p className="text-base max-w-xs leading-relaxed" style={{ color: "var(--fg-2)" }}>
            There are other ways to put designs on products. Here's what separates WRKTD.
          </p>
        </div>

        {/* Bento: large left + 2 small right + full-width bottom */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-4 mb-4">
          {/* Large left card */}
          <div className="p-10 flex flex-col gap-5 card" style={{ minHeight: 320 }}>
            <span className="font-display font-extrabold"
              style={{ fontSize: "4rem", lineHeight: 1, color: "rgba(46,91,255,0.18)" }}>
              {POINTS[0].n}
            </span>
            <div>
              <h3 className="font-display font-bold mb-4"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--fg)" }}>
                {POINTS[0].title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-3)" }}>{POINTS[0].body}</p>
            </div>
          </div>
          {/* Two small right cards */}
          <div className="flex flex-col gap-4">
            {POINTS.slice(1, 3).map((p) => (
              <div key={p.title} className="p-8 flex flex-col gap-4 card" style={{ flex: 1 }}>
                <span className="font-display font-extrabold"
                  style={{ fontSize: "2.5rem", lineHeight: 1, color: "rgba(46,91,255,0.18)" }}>
                  {p.n}
                </span>
                <div>
                  <h3 className="font-display font-bold mb-3"
                    style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: "var(--fg)" }}>
                    {p.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--fg-3)" }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Full-width bottom card */}
        <div className="p-10 flex flex-col md:flex-row gap-8 items-start card">
          <span className="font-display font-extrabold flex-shrink-0"
            style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(46,91,255,0.18)" }}>
            {POINTS[3].n}
          </span>
          <div>
            <h3 className="font-display font-bold mb-3"
              style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "var(--fg)" }}>
              {POINTS[3].title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--fg-3)" }}>{POINTS[3].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
