const BATCH = [
  { vol: "1–2 items",       fee: "Free",      free: true },
  { vol: "3–25 items",      fee: "$1.50 / item" },
  { vol: "26–100 items",    fee: "$1.25 / item" },
  { vol: "101–500 items",   fee: "$1.00 / item" },
  { vol: "501–1,000 items", fee: "$0.75 / item" },
  { vol: "1,000+ items",    fee: "Custom quote" },
];

const PLANS = [
  { name: "Starter",    size: "Up to 25 products",  fee: "Founding rate" },
  { name: "Growth",     size: "Up to 100 products", fee: "Founding rate" },
  { name: "Scale",      size: "Up to 500 products", fee: "Founding rate" },
  { name: "Enterprise", size: "500+ products",       fee: "Custom"        },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-40 px-6" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <span className="pill"><span className="pill-dot" />Pricing</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2 className="font-display font-extrabold leading-[0.88]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "var(--fg)" }}>
            Simple, transparent<br />
            <span style={{ color: "var(--fg-ghost-h)" }}>pricing.</span>
          </h2>
          <p className="text-base max-w-xs leading-relaxed" style={{ color: "var(--fg-3)" }}>
            A one-time batch fee to build your catalog, a monthly fee to keep everything running, and a per-order product cost when sales come in.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {/* Batch fee */}
          <div className="card overflow-hidden">
            <div className="px-8 py-7" style={{ borderBottom: "1px solid var(--bd)", background: "var(--fg-ghost)" }}>
              <span className="label block mb-2" style={{ color: "var(--blue)" }}>One-time</span>
              <h3 className="font-display font-bold" style={{ fontSize: "1.9rem", color: "var(--fg)" }}>Catalog Build Fee</h3>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--fg-4)" }}>
                We build your designs into full product mockups and print-ready files. First 1–2 items are free.
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--bd)" }}>
                  <th className="text-left px-8 py-3 label" style={{ color: "var(--fg-4)" }}>Volume</th>
                  <th className="text-right px-8 py-3 label" style={{ color: "var(--fg-4)" }}>Fee</th>
                </tr>
              </thead>
              <tbody>
                {BATCH.map((row, i) => (
                  <tr key={row.vol} style={{ borderBottom: i < BATCH.length - 1 ? "1px solid var(--bd)" : "none" }}>
                    <td className="px-8 py-3 text-xs" style={{ color: "var(--fg-3)" }}>{row.vol}</td>
                    <td className="px-8 py-3 text-right text-xs font-semibold"
                      style={{ color: row.free ? "#2CCF74" : "var(--fg-2)" }}>{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-8 py-4 flex items-start gap-3"
              style={{ borderTop: "1px solid rgba(46,91,255,0.12)", background: "rgba(46,91,255,0.04)" }}>
              <span style={{ color: "var(--blue)" }} className="mt-0.5 flex-shrink-0">+</span>
              <p className="text-xs leading-relaxed" style={{ color: "var(--fg-4)" }}>
                $30 per custom template if you need a presentation style not in our existing blank library.
              </p>
            </div>
          </div>

          {/* Monthly + Manufacturing */}
          <div className="flex flex-col gap-5">
            <div className="card overflow-hidden">
              <div className="px-8 py-7" style={{ borderBottom: "1px solid var(--bd)", background: "var(--fg-ghost)" }}>
                <span className="label block mb-2" style={{ color: "var(--blue)" }}>Monthly recurring</span>
                <h3 className="font-display font-bold" style={{ fontSize: "1.9rem", color: "var(--fg)" }}>Monthly Management</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--fg-4)" }}>
                  Covers hosting, daily fulfillment monitoring, fulfillment connection maintenance, and WRKTD actively resolving issues.
                </p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--bd)" }}>
                    <th className="text-left px-8 py-3 label" style={{ color: "var(--fg-4)" }}>Plan</th>
                    <th className="text-left px-8 py-3 label" style={{ color: "var(--fg-4)" }}>Catalog size</th>
                    <th className="text-right px-8 py-3 label" style={{ color: "var(--fg-4)" }}>/ mo</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((row, i) => (
                    <tr key={row.name} style={{ borderBottom: i < PLANS.length - 1 ? "1px solid var(--bd)" : "none" }}>
                      <td className="px-8 py-3 text-xs font-semibold" style={{ color: "var(--fg)" }}>{row.name}</td>
                      <td className="px-8 py-3 text-xs" style={{ color: "var(--fg-3)" }}>{row.size}</td>
                      <td className="px-8 py-3 text-right text-xs" style={{ color: "var(--fg-3)" }}>{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-7 flex flex-col gap-3 card">
              <span className="label" style={{ color: "var(--blue)" }}>Per order</span>
              <h3 className="font-display font-bold" style={{ fontSize: "1.9rem", color: "var(--fg)" }}>Product Cost</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--fg-4)" }}>
                A single bundled manufacturing cost per product is billed automatically when an order ships. Included in your product pricing setup during onboarding — no surprises.
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 flex items-start gap-4 card">
          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--blue)" }} />
          <p className="text-xs leading-relaxed" style={{ color: "var(--fg-4)" }}>
            <span className="font-semibold" style={{ color: "var(--fg)" }}>Payment on file required.</span>{" "}
            To keep your orders shipping automatically, you'll keep a valid card on file or maintain a prepaid balance. If a payment issue comes up, we flag it and reach out before anything is delayed.
          </p>
        </div>
      </div>
    </section>
  );
}
