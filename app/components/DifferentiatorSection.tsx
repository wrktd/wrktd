const INK  = "#111009";
const INK2 = "rgba(17,16,9,0.62)";
const INK3 = "rgba(17,16,9,0.38)";

const POINTS = [
  {
    glyph: "I", title: "Done-for-you, not DIY",
    body: "Most POD platforms are still largely DIY. Even when bulk tools exist, the seller is responsible for product setup, artwork placement, listings, SKUs, and fulfillment configuration. WRKTD is done-for-you and batch-oriented.",
  },
  {
    glyph: "II", title: "Preflighted before production",
    body: "Manufacturing partners don't review artwork before printing — if a file is wrong, the product prints wrong and ships to your customer. WRKTD adapts and prepares every file before it ever reaches manufacturing.",
  },
  {
    glyph: "III", title: "Every listing image, produced",
    body: "Most sellers spend hours making 5–8 listing photos per product. WRKTD generates every one — white background, lifestyle, room context, detail — for every product at every size. You don't touch a single file.",
  },
  {
    glyph: "IV", title: "Batch-first from day one",
    body: "One design becomes a full product family in a single batch. Ten designs, seven product types, seven sizes — 490 SKUs in 1–3 days. Scale your catalog without doing each product one at a time.",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="py-28 px-6" style={{ background: "#EDE9E3" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Why WRKTD</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2 className="font-display font-extrabold leading-[0.88]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: INK }}>
            A different kind<br />
            <span style={{ color: "rgba(17,16,9,0.22)" }}>of home decor partner.</span>
          </h2>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: INK2 }}>
            There are other ways to put designs on products. Here's what separates WRKTD.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(17,16,9,0.09)" }}>
          {POINTS.map((p, i) => (
            <div key={p.title} className="p-10 flex flex-col gap-6"
              style={{ background: "#F8F6F2", minHeight: 280 }}>
              <div className="flex items-start justify-between">
                <span className="font-display font-bold"
                  style={{ fontSize: "3.5rem", lineHeight: 1, color: "rgba(184,154,78,0.22)" }}>
                  {p.glyph}
                </span>
                <span className="label" style={{ color: "rgba(17,16,9,0.18)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="font-display font-bold mb-3"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)", color: INK }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: INK2 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
