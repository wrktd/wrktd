export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
          Done-for-you home decor products
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-stone-900 leading-tight mb-6">
          Turn one design into a whole product line.
        </h1>
        <p className="text-xl text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
          You already have designs and people who like your brand. We turn those designs into real home decor products — and when your fans buy something, it ships itself.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#preview"
            className="bg-stone-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-stone-700 transition-colors"
          >
            Try it free — upload a design
          </a>
          <a
            href="#how-it-works"
            className="bg-white border border-stone-200 text-stone-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-stone-50 transition-colors"
          >
            See how it works
          </a>
        </div>
        <p className="text-sm text-stone-400 mt-6">No account needed to preview. Takes about 5 seconds.</p>
      </div>
    </section>
  );
}
