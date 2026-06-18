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

const borderMid = "1px solid rgba(255,255,255,0.05)";
const borderGold = "1px solid rgba(184,154,78,0.15)";

export default function PricingSection() {
  return (
    <section id="pricing" className="glass-mid py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gold" />
          <span className="label text-gold">Pricing</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
          <h2 className="font-display font-extrabold text-white leading-[0.88]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
            Simple, transparent<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>pricing.</span>
          </h2>
          <p className="text-sm max-w-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            A one-time batch fee to build your catalog, a monthly fee to keep everything running, and a per-order product cost when sales come in.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Batch fee */}
          <div style={{ border: borderMid }}>
            <div className="px-8 py-7" style={{ borderBottom: borderMid, background: "rgba(255,255,255,0.02)" }}>
              <span className="label text-gold block mb-2">One-time</span>
              <h3 className="font-display font-bold text-white" style={{ fontSize: "1.9rem" }}>Mockup Batch Fee</h3>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                We build your designs into full product mockups and print-ready files. First 1–2 items are free.
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: borderMid }}>
                  <th className="text-left px-8 py-3 label" style={{ color: "rgba(255,255,255,0.2)" }}>Volume</th>
                  <th className="text-right px-8 py-3 label" style={{ color: "rgba(255,255,255,0.2)" }}>Fee</th>
                </tr>
              </thead>
              <tbody>
                {BATCH.map((row, i) => (
                  <tr key={row.vol} style={{ borderBottom: i < BATCH.length - 1 ? borderMid : "none" }}>
                    <td className="px-8 py-3 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{row.vol}</td>
                    <td className="px-8 py-3 text-right text-xs font-semibold"
                      style={{ color: row.free ? "#4CAF50" : "rgba(255,255,255,0.7)" }}>{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-8 py-4 flex items-start gap-3" style={{ borderTop: borderGold, background: "rgba(184,154,78,0.04)" }}>
              <span className="text-gold mt-0.5 flex-shrink-0">+</span>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                $30 per custom template if you need a presentation style not in our existing blank library. Batch fee applies on top.
              </p>
            </div>
          </div>

          {/* Monthly + Manufacturing */}
          <div className="flex flex-col gap-8">
            <div style={{ border: borderMid }}>
              <div className="px-8 py-7" style={{ borderBottom: borderMid, background: "rgba(255,255,255,0.02)" }}>
                <span className="label text-gold block mb-2">Monthly recurring</span>
                <h3 className="font-display font-bold text-white" style={{ fontSize: "1.9rem" }}>Hosting + Management</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                  Covers hosting, daily fulfillment monitoring, fulfillment connection maintenance, and WRKTD actively resolving issues.
                </p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: borderMid }}>
                    <th className="text-left px-8 py-3 label" style={{ color: "rgba(255,255,255,0.2)" }}>Plan</th>
                    <th className="text-left px-8 py-3 label" style={{ color: "rgba(255,255,255,0.2)" }}>Catalog size</th>
                    <th className="text-right px-8 py-3 label" style={{ color: "rgba(255,255,255,0.2)" }}>/ mo</th>
                  </tr>
                </thead>
                <tbody>
                  {PLANS.map((row, i) => (
                    <tr key={row.name} style={{ borderBottom: i < PLANS.length - 1 ? borderMid : "none" }}>
                      <td className="px-8 py-3 text-xs font-semibold text-white">{row.name}</td>
                      <td className="px-8 py-3 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{row.size}</td>
                      <td className="px-8 py-3 text-right text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-8 py-7 flex flex-col gap-3"
              style={{ border: borderMid, background: "rgba(255,255,255,0.02)" }}>
              <span className="label text-gold">Per order</span>
              <h3 className="font-display font-bold text-white" style={{ fontSize: "1.9rem" }}>Manufacturing Cost</h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
                A single bundled manufacturing cost per product is billed automatically when an order ships. Included in your product pricing setup during onboarding — no surprises.
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 flex items-start gap-4" style={{ border: borderMid, background: "rgba(255,255,255,0.01)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>
            <span className="font-semibold text-white">Payment on file required.</span>{" "}
            To keep your orders shipping automatically, you'll keep a valid card on file or maintain a prepaid balance. If a payment issue comes up, we flag it and reach out before anything is delayed.
          </p>
        </div>
      </div>
    </section>
  );
}
