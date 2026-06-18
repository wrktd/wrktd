"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
        {/* Real logo */}
        <a href="#" className="flex items-center">
          <Image
            src="/logo.png"
            alt="WRKTD"
            height={28}
            width={160}
            style={{ height: 28, width: "auto" }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="label text-white/35 hover:text-white/80 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#preview" className="label px-6 py-3 bg-white text-black hover:bg-gold hover:text-black transition-colors">
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
