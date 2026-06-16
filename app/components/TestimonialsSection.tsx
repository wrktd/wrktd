export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-stone-900 mb-4">
            Real results
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto">
            Here&apos;s what happens when an existing brand puts its designs on the right products.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white border border-stone-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🥋</span>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">Founding client</div>
                <h3 className="font-black text-stone-900 text-lg">Martial arts clothing brand</h3>
              </div>
            </div>
            <div className="mt-6 p-5 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-3xl font-black text-amber-700">$20K–$30K</p>
              <p className="text-amber-600 text-sm font-medium mt-1">in sales — first month, rugs only</p>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mt-5">
              Provided one design. WRKTD turned it into a rug, set up the full fulfillment pipeline, and connected their Shopify store. Orders manufactured and shipped automatically from day one.
            </p>
          </div>

          <div className="bg-white border border-stone-100 rounded-2xl p-8 shadow-sm flex flex-col justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">Coming soon</div>
            <h3 className="font-black text-stone-900 text-xl mb-3">Currently onboarding founding clients</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              More case studies coming as our founding cohort goes live. Interested in being featured? Results speak for themselves once your catalog is built.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
