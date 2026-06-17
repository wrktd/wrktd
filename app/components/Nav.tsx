"use client";
import { useState, useEffect } from "react";

function WLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 42" fill="currentColor" className={className} aria-hidden="true">
      <path d="M0 2 L14 40 L27 14 L40 40 L54 2 L47 2 L40 32 L27 8 L14 32 L7 2 Z" />
      <circle cx="27" cy="15" r="6" fill="#060606" />
      <circle cx="27" cy="15" r="2.5" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#how-it-works", label: "How it works" },
    { href: "#pricing",      label: "Pricing"      },
    { href: "#faq",          label: "FAQ"          },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo mark + wordmark */}
        <a href="#" className="flex items-center gap-3 group">
          <WLogo className="h-7 w-auto text-white group-hover:text-gold transition-colors" />
          <span
            className="font-display font-bold text-white tracking-[0.12em] text-lg"
          >
            WRKTD
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label text-white/35 hover:text-white/80 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#preview"
            className="label px-6 py-3 bg-white text-black hover:bg-gold hover:text-black transition-colors"
          >
            Try it free
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 text-white/60"
          aria-label="Menu"
        >
          <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 glass ${open ? "max-h-64" : "max-h-0"}`}>
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="label text-white/50 hover:text-white">
              {l.label}
            </a>
          ))}
          <a href="#preview" onClick={() => setOpen(false)} className="label bg-white text-black px-6 py-3 text-center hover:bg-gold transition-colors">
            Try it free
          </a>
        </div>
      </div>
    </nav>
  );
}
