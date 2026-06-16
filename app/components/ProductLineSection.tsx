const PRODUCTS = [
  { label: "Area Rugs", icon: "▭", color: "bg-amber-50 border-amber-200" },
  { label: "Woven Pillows", icon: "◻", color: "bg-green-50 border-green-200" },
  { label: "Wall Tapestries", icon: "▯", color: "bg-purple-50 border-purple-200" },
  { label: "Blankets & Throws", icon: "▭", color: "bg-blue-50 border-blue-200" },
  { label: "Shower Curtains", icon: "▯", color: "bg-rose-50 border-rose-200" },
  { label: "Woven Totes", icon: "◻", color: "bg-orange-50 border-orange-200" },
  { label: "Wall Art Prints", icon: "▭", color: "bg-teal-50 border-teal-200" },
];

export default function ProductLineSection() {
  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
            One design. A whole product line.
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            Every design you upload becomes a full family of products. More products means more ways for your audience to buy — and more revenue from every design you already own.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center shadow-inner border border-stone-200">
              <span className="text-4xl md:text-5xl">🎨</span>
            </div>
            <p className="text-center text-sm font-semibold text-stone-500 mt-3">Your design</p>
          </div>

          <div className="hidden md:flex flex-col items-center gap-1">
            <div className="w-12 h-0.5 bg-stone-300" />
            <div className="text-stone-400 text-xl">→</div>
            <p className="text-xs text-stone-400 font-medium mt-1">WRKTD builds</p>
          </div>
          <div className="md:hidden text-stone-400 text-2xl">↓</div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PRODUCTS.map((p) => (
              <div
                key={p.label}
                className={`border rounded-xl p-3 text-center ${p.color}`}
              >
                <p className="text-xs font-semibold text-stone-700">{p.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white border border-stone-100 rounded-2xl p-8 text-center shadow-sm">
          <p className="text-stone-500 text-base">
            <span className="font-black text-stone-900 text-xl">10 designs</span>
            <span className="mx-3 text-stone-300">×</span>
            <span className="font-black text-stone-900 text-xl">5 product types</span>
            <span className="mx-3 text-stone-300">×</span>
            <span className="font-black text-stone-900 text-xl">3 sizes</span>
            <span className="mx-3 text-stone-300">=</span>
            <span className="font-black text-amber-600 text-xl">150 SKUs</span>
          </p>
          <p className="text-stone-400 text-sm mt-2">from one batch — done in 1–3 days</p>
        </div>
      </div>
    </section>
  );
}
