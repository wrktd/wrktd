const POINTS = [
  {
    label: "Done-for-you",
    description:
      "Most POD platforms are still largely DIY. Even when bulk tools exist, the seller is responsible for product setup, artwork placement, listings, SKUs, and fulfillment configuration. WRKTD is done-for-you and batch-oriented.",
    icon: "✦",
  },
  {
    label: "File accuracy guaranteed",
    description:
      "Manufacturing partners don't review artwork before printing — if a file is wrong, the product prints wrong and ships to your customer. WRKTD adapts and prepares every file correctly before it ever reaches manufacturing.",
    icon: "✓",
  },
  {
    label: "Monitored, not abandoned",
    description:
      "Your fulfillment pipeline is designed to run automatically after setup, with WRKTD monitoring the system and handling routing issues — not just hosting it and hoping nothing breaks.",
    icon: "◎",
  },
  {
    label: "Batch-first from day one",
    description:
      "One design becomes a full product family in a single batch. The more designs you have, the faster your catalog grows — without doing each product one at a time.",
    icon: "≡",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="py-24 px-6 bg-stone-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Why WRKTD is different
          </h2>
          <p className="text-lg text-stone-400 max-w-xl mx-auto">
            There are other ways to put designs on products. Here&apos;s what sets WRKTD apart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {POINTS.map((point) => (
            <div
              key={point.label}
              className="bg-stone-800 border border-stone-700 rounded-2xl p-7"
            >
              <div className="text-amber-400 text-2xl font-black mb-3">{point.icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{point.label}</h3>
              <p className="text-stone-400 leading-relaxed text-sm">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
