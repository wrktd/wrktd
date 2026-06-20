const FG  = "#F0F0F0";
const FG2 = "rgba(240,240,240,0.58)";
const FG4 = "rgba(240,240,240,0.14)";

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
    n: "03", title: "Every listing image, produced",
    body: "Most sellers spend hours making 5–8 listing photos per product. WRKTD generates every one — white background, lifestyle, room context, detail — for every product at every size. You don't touch a single file.",
  },
  {
    n: "04", title: "Batch-first from day one",
    body: "One design becomes a full product family in a single batch. Ten designs, seven product types, seven sizes — 490 SKUs in 1–3 days. Scale your catalog without doing each product one at a time.",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="py-32 px-6" style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Why WRKTD</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2 className="font-display font-extrabold leading-[0.88]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: FG }}>
            A different kind<br />
            <span style={{ color: FG4 }}>of home decor partner.</span>
          </h2>
          <p className="text-base max-w-xs leading-relaxed" style={{ color: FG2 }}>
            There are other ways to put designs on products. Here's what separates WRKTD.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {POINTS.map((p) => (
            <div key={p.title} className="p-10 flex flex-col gap-5"
              style={{ background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, minHeight: 260 }}>
              <div className="flex items-start justify-between">
                <span className="font-display font-extrabold"
                  style={{ fontSize: "3rem", lineHeight: 1, color: "rgba(184,154,78,0.15)" }}>
                  {p.n}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold mb-4"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)", color: FG }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: FG2 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
