"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing",      label: "Pricing" },
    { href: "#faq",          label: "FAQ" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/96 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-medium tracking-[0.18em] text-cream">
          WRKTD
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label text-cream/40 hover:text-cream/75 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#preview"
            className="label bg-gold text-ink px-6 py-3 hover:bg-gold-light transition-colors"
          >
            Try it free
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 text-cream/60"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-current transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64" : "max-h-0"
        } bg-ink border-t border-white/[0.06]`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="label text-cream/50 hover:text-cream"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#preview"
            onClick={() => setMenuOpen(false)}
            className="label bg-gold text-ink px-6 py-3 text-center hover:bg-gold-light transition-colors"
          >
            Try it free
          </a>
        </div>
      </div>
    </nav>
  );
}
