const BATCH = [
  { vol: "1–2 items",       fee: "Free",      free: true },
  { vol: "3–25 items",      fee: "$1.50 / item" },
  { vol: "26–100 items",    fee: "$1.25 / item" },
  { vol: "101–500 items",   fee: "$1.00 / item" },
  { vol: "501–1,000 items", fee: "$0.75 / item" },
  { vol: "1,000+ items",    fee: "Custom quote" },
];

const PLANS = [
  { name: "Starter",    size: "Up to 25 products",  fee: "TBD" },
  { name: "Growth",     size: "Up to 100 products", fee: "TBD" },
  { name: "Scale",      size: "Up to 500 products", fee: "TBD" },
  { name: "Enterprise", size: "500+ products",       fee: "Custom" },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28 px-6 bg-cream-warm">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Pricing</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2
            className="font-display font-light text-ink leading-[0.92]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            Simple, transparent
            <br />
            <em className="not-italic text-ink/50">pricing.</em>
          </h2>
          <p className="text-sm text-ink-muted max-w-xs leading-relaxed">
            A one-time batch fee to build your catalog, a monthly fee to keep
            everything running, and a per-order manufacturing cost when sales come in.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Batch fee */}
          <div style={{ border: "1px solid rgba(12,10,9,0.08)" }}>
            <div
              className="px-8 py-7"
              style={{ borderBottom: "1px solid rgba(12,10,9,0.08)", background: "rgba(12,10,9,0.03)" }}
            >
              <span className="label text-gold block mb-2">One-time</span>
              <h3
                className="font-display font-light text-ink"
                style={{ fontSize: "1.9rem" }}
              >
                Mockup Batch Fee
              </h3>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                We build your designs into full product mockups and print-ready files.
                First 1–2 items are free.
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(12,10,9,0.06)" }}>
                  <th className="text-left px-8 py-3 label text-ink-muted">Volume</th>
                  <th className="text-right px-8 py-3 label text-ink-muted">Fee</th>
                </tr>
              </thead>
              <tbody>
                {BATCH.map((row, i) => (
                  <tr
                    key={row.vol}
                    style={{
                      borderBottom: i < BATCH.length - 1 ? "1px solid rgba(12,10,9,0.05)" : "none",
                    }}
                  >
                    <td className="px-8 py-3 text-ink text-xs">{row.vol}</td>
                    <td
                      className="px-8 py-3 text-right text-xs font-semibold"
                      style={{ color: row.free ? "#5A8A5A" : "#0C0A09" }}
                    >
                      {row.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="px-8 py-4 flex items-start gap-3"
              style={{ borderTop: "1px solid rgba(184,154,78,0.2)", background: "rgba(184,154,78,0.05)" }}
            >
              <span className="text-gold mt-0.5 flex-shrink-0">+</span>
              <p className="text-xs text-ink-muted leading-relaxed">
                $30 per custom template if you need a presentation style not in our existing blank library. Batch fee applies on top.
              </p>
            </div>
          </div>

          {/* Monthly + Manufacturing */}
          <div className="flex flex-col gap-8">
            <div style={{ border: "1px solid rgba(12,10,9,0.08)" }}>
              <div
                className="px-8 py-7"
                style={{ borderBottom: "1px solid rgba(12,10,9,0.08)", background: "rgba(12,10,9,0.03)" }}
              >
                <span className="label text-gold block mb-2">Monthly recurring</span>
                <h3
                  className="font-display font-light text-ink"
                  style={{ fontSize: "1.9rem" }}
                >
                  Hosting + Management
                </h3>
                <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                  Covers hosting, daily fulfillment monitoring, MWW connection maintenance,
                  and WRKTD actively resolving issues.
                </p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(12,10,9,0.06)" }}>
                    <th className="text-left px-8 py-3 label text-ink-muted">Plan</th>
                    <th className="text-left px-8 py-3 label text-ink-muted">Catalog size</th>
                    <th className="text-right px-8 py-3 label text-ink-muted">/ mo</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((row, i) => (
                    <tr
                      key={row.name}
                      style={{
                        borderBottom: i < PLANS.length - 1 ? "1px solid rgba(12,10,9,0.05)" : "none",
                      }}
                    >
                      <td className="px-8 py-3 text-xs font-semibold text-ink">{row.name}</td>
                      <td className="px-8 py-3 text-xs text-ink-muted">{row.size}</td>
                      <td className="px-8 py-3 text-right text-xs text-ink-muted">{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Manufacturing cost card */}
            <div
              className="px-8 py-7 flex flex-col gap-3"
              style={{ border: "1px solid rgba(12,10,9,0.08)", background: "rgba(12,10,9,0.02)" }}
            >
              <span className="label text-gold">Per order</span>
              <h3
                className="font-display font-light text-ink"
                style={{ fontSize: "1.9rem" }}
              >
                Manufacturing Cost
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                A single bundled manufacturing cost per product is billed automatically when an order ships. Included in your product pricing setup during onboarding — no surprises.
              </p>
            </div>
          </div>
        </div>

        {/* Payment-on-file notice */}
        <div
          className="px-8 py-6 flex items-start gap-4"
          style={{ border: "1px solid rgba(12,10,9,0.08)", background: "rgba(12,10,9,0.02)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
          <p className="text-xs text-ink-muted leading-relaxed">
            <span className="font-semibold text-ink">Payment on file required.</span>{" "}
            To keep your orders shipping automatically, you'll keep a valid card on file or maintain a prepaid balance. If a payment issue comes up, we flag it and reach out before anything is delayed.
          </p>
        </div>
      </div>
    </section>
  );
}
