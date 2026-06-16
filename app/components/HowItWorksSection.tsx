const STEPS = [
  {
    number: "1",
    title: "Upload your designs",
    description:
      "Drop in your existing artwork, logos, or patterns. No special file prep — we accept JPG, PNG, SVG, AI, and PSD. We handle the rest.",
    time: "Day 1",
    color: "bg-amber-500",
  },
  {
    number: "2",
    title: "WRKTD builds your catalog",
    description:
      "We adapt each design to every product, generate all mockup angles, prepare manufacturing-ready print files, and connect your store — all in about 5–7 days.",
    time: "Days 1–7",
    color: "bg-stone-700",
  },
  {
    number: "3",
    title: "Orders ship automatically",
    description:
      "Your store is live. When a customer buys, the order routes to manufacturing and ships in 5–10 days. WRKTD monitors the system and handles any issues.",
    time: "Ongoing",
    color: "bg-green-600",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            From your first upload to live orders shipping — here&apos;s the full picture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-stone-100 z-0" style={{ width: "calc(100% - 3.5rem)", left: "calc(3.5rem)" }} />
              )}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${step.color} text-white flex items-center justify-center font-black text-xl mb-5 shadow-sm`}>
                  {step.number}
                </div>
                <div className="inline-block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2 bg-stone-50 px-2 py-1 rounded">
                  {step.time}
                </div>
                <h3 className="text-xl font-black text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-stone-50 border border-stone-100 rounded-2xl p-8">
          <p className="text-stone-600 text-center text-base leading-relaxed max-w-2xl mx-auto">
            <span className="font-semibold text-stone-900">From upload to live store:</span> about 5–7 days. After that, when your customers buy something, it&apos;s designed to ship automatically in 5–10 days — and we monitor the system to catch and fix anything that needs attention.
          </p>
        </div>
      </div>
    </section>
  );
}
