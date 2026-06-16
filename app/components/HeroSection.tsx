"use client";
export default function HeroSection() {
  return (
    <section className="grain relative min-h-screen bg-ink flex flex-col justify-center overflow-hidden">
      {/* Ambient gold glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-15%",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,154,78,0.13) 0%, transparent 65%)",
        }}
      />
      {/* Ambient glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,154,78,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-36 pb-28">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px w-10 bg-gold" />
          <span className="label text-gold">Done-for-you home decor products</span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-light text-cream leading-[0.9] mb-10 tracking-[-0.01em]"
          style={{ fontSize: "clamp(3.2rem, 8.5vw, 7.5rem)" }}
        >
          Turn one design
          <br />
          into a whole
          <br />
          <em className="text-gold not-italic">product line.</em>
        </h1>

        {/* Subhead */}
        <p
          className="max-w-md text-lg md:text-xl font-light leading-relaxed mb-14"
          style={{ color: "rgba(250,247,242,0.42)" }}
        >
          You already have designs and people who like your brand. We turn
          those designs into real home decor products — and when your fans
          buy something, it ships itself.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#preview"
            className="label inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-ink px-8 py-4 transition-colors"
          >
            Try it free — upload a design
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="label inline-flex items-center justify-center px-8 py-4 transition-all"
            style={{
              border: "1px solid rgba(250,247,242,0.12)",
              color: "rgba(250,247,242,0.45)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(250,247,242,0.28)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(250,247,242,0.75)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "rgba(250,247,242,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(250,247,242,0.45)";
            }}
          >
            See how it works
          </a>
        </div>

        {/* Floating proof stat — desktop only */}
        <div
          className="hidden lg:block absolute"
          style={{ bottom: "3rem", right: "2.5rem" }}
        >
          <div
            style={{
              borderLeft: "1px solid rgba(184,154,78,0.28)",
              paddingLeft: "1.5rem",
            }}
          >
            <p
              className="font-display font-light"
              style={{ fontSize: "3.25rem", lineHeight: 1, color: "#B89A4E" }}
            >
              $25K+
            </p>
            <p
              className="label mt-2"
              style={{ color: "rgba(250,247,242,0.22)" }}
            >
              first-month revenue
              <br />
              founding client · rugs only
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity: 0.18 }}
      >
        <span className="label text-cream">Scroll</span>
        <div
          className="w-px h-10 bg-cream origin-top"
          style={{ animation: "scrollLine 2.4s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
