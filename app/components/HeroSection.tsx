"use client";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* No background — shader shows through */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-36 pb-28">

        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-10 bg-gold" />
          <span className="label text-gold">Done-for-you home decor products</span>
        </div>

        <h1
          className="font-display font-extrabold text-white leading-[0.88] mb-10 tracking-[-0.03em]"
          style={{ fontSize: "clamp(3.4rem, 9vw, 8.5rem)" }}
        >
          Turn one design<br />
          into a whole<br />
          <span style={{ color: "rgba(255,255,255,0.22)" }}>product line.</span>
        </h1>

        <p
          className="max-w-md text-lg md:text-xl font-light leading-relaxed mb-14"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          You already have designs and people who like your brand. We turn
          those designs into real home decor products — and when your fans
          buy something, it ships itself.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#preview"
            className="label inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 hover:bg-gold transition-colors"
          >
            Try it free — upload a design
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="label inline-flex items-center justify-center px-8 py-4 transition-all"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
            }}
          >
            See how it works
          </a>
        </div>

        {/* Proof stat */}
        <div className="hidden lg:block absolute" style={{ bottom: "3.5rem", right: "2.5rem" }}>
          <div style={{ borderLeft: "1px solid rgba(184,154,78,0.3)", paddingLeft: "1.5rem" }}>
            <p className="font-display font-bold" style={{ fontSize: "3.2rem", lineHeight: 1, color: "#B89A4E" }}>$25K+</p>
            <p className="label mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>
              first-month revenue<br />founding client · rugs only
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ opacity: 0.15 }}>
        <span className="label text-white">Scroll</span>
        <div className="w-px h-10 bg-white origin-top" style={{ animation: "scrollLine 2.4s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
