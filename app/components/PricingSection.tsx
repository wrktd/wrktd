const BATCH_TIERS = [
  { volume: "1–2 items", fee: "Free" },
  { volume: "3–25 items", fee: "$1.50 / item" },
  { volume: "26–100 items", fee: "$1.25 / item" },
  { volume: "101–500 items", fee: "$1.00 / item" },
  { volume: "501–1,000 items", fee: "$0.75 / item" },
  { volume: "1,000+ items", fee: "Custom quote" },
];

const MONTHLY_PLANS = [
  { plan: "Starter", catalog: "Up to 25 products", fee: "TBD" },
  { plan: "Growth", catalog: "Up to 100 products", fee: "TBD" },
  { plan: "Scale", catalog: "Up to 500 products", fee: "TBD" },
  { plan: "Enterprise", catalog: "500+ products", fee: "Custom" },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            A one-time batch fee to build your catalog, a monthly fee to keep everything running, and a per-order manufacturing cost when sales come in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Batch Fee */}
          <div className="border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-stone-900 text-white p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">One-time</div>
              <h3 className="text-xl font-black">Mockup Batch Fee</h3>
              <p className="text-stone-400 text-sm mt-2">
                We build your designs into full product mockups and print-ready files. First 1–2 items are free so you can see the quality before committing.
              </p>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-5 py-3 text-stone-500 font-semibold text-xs uppercase tracking-wide">Volume</th>
                  <th className="text-right px-5 py-3 text-stone-500 font-semibold text-xs uppercase tracking-wide">Fee</th>
                </tr>
              </thead>
              <tbody>
                {BATCH_TIERS.map((tier, i) => (
                  <tr key={tier.volume} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                    <td className="px-5 py-3 text-stone-700">{tier.volume}</td>
                    <td className={`px-5 py-3 text-right font-semibold ${tier.fee === "Free" ? "text-green-600" : "text-stone-900"}`}>{tier.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-5 border-t border-stone-100 bg-amber-50">
              <p className="text-xs text-amber-800 font-medium">
                + $30 per custom template if you need a presentation style not in our existing library.
              </p>
            </div>
          </div>

          {/* Monthly + Manufacturing */}
          <div className="flex flex-col gap-6">
            <div className="border border-stone-100 rounded-2xl overflow-hidden shadow-sm flex-1">
              <div className="bg-stone-800 text-white p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">Monthly</div>
                <h3 className="text-xl font-black">Hosting + OrderDesk Management</h3>
                <p className="text-stone-400 text-sm mt-2">
                  Covers hosting, daily fulfillment monitoring, MWW connection maintenance, and WRKTD actively watching for and fixing issues.
                </p>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-stone-50">
                  <tr>
                    <th className="text-left px-5 py-3 text-stone-500 font-semibold text-xs uppercase tracking-wide">Plan</th>
                    <th className="text-left px-5 py-3 text-stone-500 font-semibold text-xs uppercase tracking-wide">Catalog size</th>
                    <th className="text-right px-5 py-3 text-stone-500 font-semibold text-xs uppercase tracking-wide">/mo</th>
                  </tr>
                </thead>
                <tbody>
                  {MONTHLY_PLANS.map((plan, i) => (
                    <tr key={plan.plan} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                      <td className="px-5 py-3 font-semibold text-stone-800">{plan.plan}</td>
                      <td className="px-5 py-3 text-stone-500 text-xs">{plan.catalog}</td>
                      <td className="px-5 py-3 text-right text-stone-400 font-medium text-xs">{plan.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border border-stone-100 rounded-2xl p-6 bg-stone-50 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">Per order</div>
              <h3 className="text-lg font-black text-stone-900 mb-2">Manufacturing Cost</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                A single bundled manufacturing cost per product is billed automatically when an order ships. No hidden fees — the cost is included in your product pricing setup during onboarding.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
          <p className="text-blue-800 text-sm leading-relaxed max-w-2xl mx-auto">
            <span className="font-semibold">Payment on file required.</span> To keep your orders shipping automatically, you&apos;ll keep a valid card on file or maintain a prepaid balance. If a payment issue comes up, we flag it and reach out before anything is delayed.
          </p>
        </div>
      </div>
    </section>
  );
}
